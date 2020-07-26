import { Server, Socket } from 'socket.io';
import { configuration } from '../config';
import * as camera from '../services/camera';
import * as jwt from 'jsonwebtoken';
import * as database from './db-middleware';

let loop: NodeJS.Timeout = null;

export async function connection(io: Server, socket: Socket) {

    if (socket.handshake.query && socket.handshake.query.token) {
        try {
            const token: { id: string, iat: number, exp: number } = JSON.parse(JSON.stringify(jwt.verify(socket.handshake.query.token, configuration.server.secret)));
            const result = await database.verifyAdmin(token.id);
        } catch {
            socket.disconnect(true);
        }
    }

    if (loop === null) {
        loop = setInterval(() => {
            camera.takePhoto().then(data => {
                io.sockets.emit('image', data);
            });
        }, configuration.server.eventInterval);
    }
    
    // Close socket, stop photo stream if there are not more sockets
    socket.on('disconnect', () => {
        if (Object.keys(io.sockets.sockets).length === 0) {
            clearInterval(loop);
            loop = null;
        }
    });
}