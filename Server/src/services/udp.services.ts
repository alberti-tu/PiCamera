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

	private data: BehaviorSubject<PayloadUDP> = new BehaviorSubject<PayloadUDP>(null);
	private socket: Socket;
	private type: string;

	constructor(options?: OptionsUDP) {
		this.socket = createSocket('udp4');

		this.socket.on('error', () => this.close());

		this.socket.on('message', (message, info) => {
			const payload: PayloadUDP = { address: info.address, port: info.port, message: message.toString() };

			this.data.next(payload);

			if (options && options.logs) {
				this.print(payload);
			}
		});

		if (options && options.port) {
			this.type = ServiceTypeUDP.Server;

			this.socket.on('listening', () => {
				console.log(this.type + ' port: ' + this.socket.address().port + '\n');
			});

			this.socket.bind(options.port);
		} else {
			this.type = ServiceTypeUDP.Client;
		}
	}

	public send(address: string, port: number, message: string): void {
		this.socket.send(message, port, address);
	}

	public stream(): Observable<PayloadUDP> {
		return new Observable<PayloadUDP>(observer => {
			this.data.subscribe(payload => {
				if (payload != null) {
					observer.next(payload)
				}
			});
		});
	}

	public close(): void {
		this.socket.close(() => console.log(this.type + ' is closed'));
	}

	private print(payload: PayloadUDP): void {
		const length = payload.message != null ? payload.message.length : 0;
		console.log('+-------- ' + this.type + ' -------+');
		console.log('From: ' + payload.address + ':' + payload.port);
		console.log('Size: ' + length + (length == 1 ? ' Byte' : ' Bytes'));
		console.log('+---------------------------+\n');
	}
}