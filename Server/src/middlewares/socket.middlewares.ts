import { Observable, Subject } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { FrameStream } from '../models/http.models';
import { decodeToken } from '../services/authentication.services';

import * as database from './database.middlewares';

const dataStream = new Subject<FrameStream>();
const userStream = new Subject<string>();

export enum SocketEvent {
	disconnect = 'disconnect',
	image = 'image',
	subscriptions = 'subscriptions',
	unauthorized = 'unauthorized'
}

export async function connection(io: Server, socket: Socket) {

    let userId: string = '';
    let list: string[] = [];

	if (socket.handshake.query && socket.handshake.query.token) {
        try {
            userId = decodeToken(socket.handshake.query.token).id;
            await database.checkUser(userId);
        } catch {
            socket.emit(SocketEvent.unauthorized);
            socket.disconnect(true);
        }
    } else {
        socket.emit(SocketEvent.unauthorized);
        socket.disconnect(true);
    }

    const subscriptions = await database.selectSubscriptions(userId);
    list = subscriptions.map<string>(item => item.camera_id);
    socket.emit(SocketEvent.subscriptions, list);

    getSubscriptionList().subscribe(async user_id => {
        if (userId == user_id) {
            const subscriptions = await database.selectSubscriptions(user_id);
            list = subscriptions.map<string>(item => item.camera_id);
            socket.emit(SocketEvent.subscriptions, list);
        }
    });

    getStream().subscribe(image => {
        const subscription = list.find(item => item == image.id)

        if (subscription != null) {
            image.data = image.data != null ? 'data:image/jpg;base64,' + image.data : null;
            socket.emit(SocketEvent.image, image);
        }
    });
}

export function getStream(): Observable<FrameStream> {
    return new Observable<FrameStream>(observer => {
        dataStream.subscribe(data => observer.next(data));
    });
}

export function setStream(id: string, data: string): void {
    dataStream.next({ id: id, data: data });
}

export function getSubscriptionList(): Observable<string> {
    return new Observable<string>(observer => {
        userStream.subscribe(data => observer.next(data));
    });
}

export function setSubscriptionList(id: string) {
    userStream.next(id);
}
