import { Component, OnInit } from '@angular/core';
import { ICameraSubscription, Image } from 'src/app/models/http.models';
import { AlertService } from 'src/app/services/alert/alert.service';
import { HttpService } from 'src/app/services/http/http.service';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	public subscriptions?: ICameraSubscription[] = undefined;
	public pictures?: Image[] = undefined;

	constructor(private alert: AlertService, private http: HttpService, private socket: SocketService) {	}

	public ngOnInit(): void {
		this.subscriptions = [];
	}

	public savePicture(frame: Image): void {
		if (frame.id == undefined || frame.data == undefined) {
			return;
		}

		this.http.savePicture(frame.id, frame.data.replace('data:image/jpg;base64,', '')).subscribe(data => {
			if (data.result) {
				this.alert.showToast('toast.info.saved', 'info');
			}
		});
	}

}
