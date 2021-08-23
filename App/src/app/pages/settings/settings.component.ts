import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { HttpService } from 'src/app/services/http/http.service';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

	constructor(private _alert: AlertService, private _http: HttpService, private _socket: SocketService) { }

	public ngOnInit(): void {	}
}
