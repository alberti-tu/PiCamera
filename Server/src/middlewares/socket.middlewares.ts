import { Server, Socket } from 'socket.io';
import { decodeToken } from '../services/authentication.services';
import * as database from './database.middlewares';

export enum SocketEvent {
	disconnect = 'disconnect',
	unauthorized = 'unauthorized'
}

export async function connection(io: Server, socket: Socket) {

    let user_id = '';

	if (socket.handshake.query && socket.handshake.query.token) {
        try {
            user_id = decodeToken(socket.handshake.query.token).id;
            await database.checkUser(user_id);
        } catch {
            socket.emit(SocketEvent.unauthorized);
            socket.disconnect(true);
        }
    }

    const subscriptions = await database.selectSubscriptions(user_id);

    subscriptions.forEach(item => socket.join(item.id));

    console.log('Connections: ' + Object.keys(io.sockets.sockets).length);
    socket.on(SocketEvent.disconnect, () => {
        console.log('Connections: ' + Object.keys(io.sockets.sockets).length)
    });
}
