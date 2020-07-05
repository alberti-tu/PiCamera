import { Server, Socket } from 'socket.io';
import * as camera from '../services/camera';

let loop: NodeJS.Timeout = null;

export async function connection(io: Server, socket: Socket) {
    if (Object.keys(io.sockets.sockets).length === 1) {
        loop = setInterval(() => camera.takePhoto().then(data => socket.emit('image', data)), 5000);
    }

    socket.on('disconnect', () => {
        if (Object.keys(io.sockets.sockets).length === 0) {
            clearInterval(loop);
        }
    });
}