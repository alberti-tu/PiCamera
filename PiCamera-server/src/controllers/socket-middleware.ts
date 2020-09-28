import { Server, Socket } from 'socket.io';
import { configuration } from '../config';
import { Camera } from '../services/camera-service';
import * as jwt from 'jsonwebtoken';
import * as database from './db-middleware';

const camera = Camera.getInstance(configuration.camera);

const enum SocketEvent {
    disconnect = 'disconnect',
    image = 'image'
}

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
            io.sockets.emit(SocketEvent.image, data);
        });
    }

    // Last user stop the stream
    socket.on(SocketEvent.disconnect, () => {
        console.log('DISCONNECT');
        if (Object.keys(io.sockets.sockets).length === 0) {
            camera.streamStop();
        }
    });
}