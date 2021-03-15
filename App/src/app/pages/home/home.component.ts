import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

	constructor(private _socket: SocketService) { }

	public ngOnInit(): void {
		this._socket.connect()
	}

	public ngOnDestroy(): void {
		this._socket.disconnect();
	}

}
