import { createSocket, Socket } from 'dgram';
import { BehaviorSubject, Observable } from 'rxjs';

export interface OptionsUDP {
    logs?: boolean;
    port?: number;
}

export interface PayloadUDP {
    message: string | null;
    address: string;
    port: number;
}

export enum ServiceTypeUDP {
    Client = 'UDP Client',
    Server = 'UDP Server'
}

export class ServiceUDP {

    private _data: BehaviorSubject<PayloadUDP> = new BehaviorSubject<PayloadUDP>(null);
    private _socket: Socket;
    private _type: string;

    constructor(options?: OptionsUDP) {
        this._socket = createSocket('udp4');

        this._socket.on('error', () => this.close());

        this._socket.on('message', (message, info) => {
            const payload: PayloadUDP = { address: info.address, port: info.port, message: message.toString() };

            this._data.next(payload);

            if (options && options.logs) {
                this._print(payload);
            }
        });
        
        if (options && options.port) {
            this._type = ServiceTypeUDP.Server;

            this._socket.on('listening', () => {
                console.log(this._type + ' port: ' + this._socket.address().port + '\n');
            });

            this._socket.bind(options.port);
        } else {
            this._type = ServiceTypeUDP.Client;
        }
    }

    public send(address: string, port: number, message: string): void {
        this._socket.send(message, port, address);
    }

    public stream(): Observable<PayloadUDP> {
        return new Observable<PayloadUDP>(observer => {
            this._data.subscribe(payload => {
                if (payload != null) {
                    observer.next(payload)
                }
            });
        });
    }

    public close(): void {
        this._socket.close(() => console.log(this._type + ' is closed'));
    }

    private _print(payload: PayloadUDP): void {
        const length = payload.message != null ? payload.message.length : 0;
        console.log('+-------- ' + this._type + ' -------+');
        console.log('From: ' + payload.address + ':' + payload.port);
        console.log('Size: ' + length + (length == 1 ? ' Byte' : ' Bytes'));
        console.log('+---------------------------+\n');
    }
}