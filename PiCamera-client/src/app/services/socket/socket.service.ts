import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment} from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SocketService {

  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io.connect(environment.url);
  }

  public getImage(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('image', (message: string) => observer.next(message) );
    });
  }

}
