import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { environment } from 'src/environments/environment';
import * as io from 'socket.io-client';

export enum SocketEvent {
	disconnect = 'disconnect',
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
	
	public disconnect(): void {
		if (this.socket != null) {
			this.socket.close();
		} else {
			console.error('Not found any socket to disconnect');
		}
	}

}
