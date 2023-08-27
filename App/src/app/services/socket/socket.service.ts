import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication/authentication.service';

import { Image } from 'src/app/models/http.models';

export enum SocketEvent {
	disconnect = 'disconnect',
	image = 'image',
	subscriptions = 'subscriptions',
	unauthorized = 'unauthorized'
}

@Injectable({ providedIn: 'root' })
export class SocketService {

	private socket?: Socket = undefined;

	constructor(private auth: AuthenticationService) { }

	public connect(): void {
		if (this.socket == undefined) {
			this.socket = io(environment.url, { query: { token: this.auth.getToken() } });

			this.socket.on(SocketEvent.unauthorized, () => this.auth.removeToken(true));
			this.socket.on(SocketEvent.disconnect, () => this.socket = undefined);
		} else {
			console.error('There is a previous socket connected');
		}
	}
	
	public getImage(): Observable<Image> {
		return new Observable<Image>(observer => {
			this.socket?.on(SocketEvent.image, (message: Image) => observer.next(message) );
		});
	}

	public getSubscriptions(): Observable<string[]> {
		return new Observable<string[]>(observer => {
			this.socket?.on(SocketEvent.subscriptions, (list: string[]) => observer.next(list) );
		});
	}

	public disconnect(): void {
		if (this.socket != undefined) {
			this.socket.close();
		} else {
			console.error('Not found any socket to disconnect');
		}
	}

}
