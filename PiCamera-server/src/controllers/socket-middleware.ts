import { Server, Socket } from 'socket.io';
import { Camera } from '../services/camera';
import { configuration } from '../config';
import * as jwt from 'jsonwebtoken';
import * as database from './db-middleware';

const camera = new Camera();

export async function connection(io: Server, socket: Socket) {

    if (socket.handshake.query && socket.handshake.query.token) {
        try {
            const token: { id: string, iat: number, exp: number } = JSON.parse(JSON.stringify(jwt.verify(socket.handshake.query.token, configuration.server.secret)));
            const result = await database.verifyAdmin(token.id);
        } catch {
            socket.disconnect(true);
        }
    }

    // First user start the stream
    if (Object.keys(io.sockets.sockets).length === 1) {
        camera.streamStart().subscribe(data => {
            console.log(data);
            io.sockets.emit('image', data);
        });
    }

    // Close socket, stop stream if there are not more sockets
    socket.on('disconnect', () => {
        if (Object.keys(io.sockets.sockets).length === 0) {
            camera.streamStop();
        }
    });
}