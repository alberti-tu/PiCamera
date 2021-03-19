import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { environment } from 'src/environments/environment';
import { Image } from 'src/app/models/http.models';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

export enum SocketEvent {
	disconnect = 'disconnect',
	image = 'image',
	subscriptions = 'subscriptions',
	unauthorized = 'unauthorized'
}

@Injectable({ providedIn: 'root' })
export class SocketService {

	private socket: SocketIOClient.Socket = null;

	constructor(private authService: AuthenticationService) { }
  
	public connect(): void {
		if (this.socket == null) {
			this.socket = io.connect(environment.url, { query: { token: this.authService.getToken() } });

			this.socket.on(SocketEvent.unauthorized, () => this.authService.removeToken());
			this.socket.on(SocketEvent.disconnect, () => this.socket = null);
		} else {
			console.error('There is a previous socket connected');
		}
	}
	
	public getImage(): Observable<Image> {
		return new Observable<Image>(observer => {
			this.socket.on(SocketEvent.image, (message: Image) => observer.next(message) );
		});
	}

	public getSubscriptions(): Observable<string[]> {
		return new Observable<string[]>(observer => {
			this.socket.on(SocketEvent.subscriptions, (list: string[]) => observer.next(list) );
		});
	}

	public disconnect(): void {
		if (this.socket != null) {
			this.socket.close();
		} else {
			console.error('Not found any socket to disconnect');
		}
	}

}
