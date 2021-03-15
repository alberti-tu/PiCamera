import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	constructor(private _socket: SocketService) { }

	public ngOnInit(): void { }

}
