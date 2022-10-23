import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICameraSubscription, Image } from 'src/app/models/http.models';
import { AlertService } from 'src/app/services/alert/alert.service';
import { HttpService } from 'src/app/services/http/http.service';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

	public subscriptions?: ICameraSubscription[] = undefined;
	public cameras?: Image[] = undefined;

	constructor(private alert: AlertService, private http: HttpService, private socket: SocketService) {	}

	public ngOnInit(): void {
		this.socket.connect();

		this.socket.getSubscriptions().subscribe(event => {
			this.cameras = event.map<Image>(item => ({ id: item, name: undefined, data: undefined }));

			this.http.getAllSubscriptions().subscribe(data => {
				this.subscriptions = data?.result;

				this.cameras?.forEach(camera => {
					camera.name = data?.result.find(item => item.camera_id == camera.id)?.name;
				});
			});
		});

		this.socket.getImage().subscribe(event => {
			const image = this.cameras?.find(item => item?.id == event?.id);

			if (image != undefined && event?.data != undefined) {
				image.data = 'data:image/jpg;base64,' + event.data;
			}
		});
	}

	public savePicture(image: Image, event?: MouseEvent): void {
		event?.stopPropagation();

		if (image.id == undefined || image.data == undefined) {
			return;
		}

		this.http.savePicture(image.id, image.data.replace('data:image/jpg;base64,', '')).subscribe(data => {
			if (data.result) {
				this.alert.showToast('toast.info.saved', 'info');
			}
		});
	}

	public ngOnDestroy(): void {
		this.socket.disconnect();
	}
}
