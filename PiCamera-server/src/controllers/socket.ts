import { Server, Socket } from 'socket.io';
import { configuration } from '../config';
import * as camera from '../services/camera';

let loop: NodeJS.Timeout = null;

export async function connection(io: Server, socket: Socket) {
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