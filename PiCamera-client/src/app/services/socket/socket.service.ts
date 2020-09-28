import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { AuthenticationService } from '../authentication/authentication.service';
import { environment} from 'src/environments/environment';
import { Observable } from 'rxjs';

export enum SocketEvent {
  disconnect = 'disconnect',
  image = 'image'
}

@Injectable({ providedIn: 'root' })
export class SocketService {

  private socket: SocketIOClient.Socket = null;

  constructor(private authService: AuthenticationService) { }

  public connect(): void {
    if (this.socket == null) {
      this.socket = io.connect(environment.url, { query: { token: this.authService.getToken() } });
      this.socket.on(SocketEvent.disconnect, () => this.socket = null);
    } else {
      console.error('There is a previous socket connected');
    }
  }

  public getImage(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on(SocketEvent.image, (message: string) => observer.next(message) );
    });
  }

  public disconnect(): void {
    if (this.socket == null) {
      console.error('Not found any socket to disconnect');
    } else {
      this.socket.close();
    }
  }

}
