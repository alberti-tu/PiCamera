import { Component, OnDestroy, OnInit } from '@angular/core';
import { Image } from 'src/app/models/http.models';
import { AlertService } from 'src/app/services/alert/alert.service';
import { HttpService } from 'src/app/services/http/http.service';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

	public imageList: Image[] = [];
	public errorImage: string = 'assets/images/error_404.jpg';

	constructor(private _alert: AlertService, private _http: HttpService, private _socket: SocketService) { }

	public ngOnInit(): void {
		this._socket.connect();

		this._socket.getSubscriptions().subscribe(event => {
			this.imageList = event.map<Image>(item => ({ id: item, name: null, data: this.errorImage }));

			this._http.getAllSubscriptions().subscribe(data => {
				this.imageList.forEach(image => {
					const subscription = data.result.find(item => item.camera_id == image.id);

					if (subscription != null) {
						image.name = subscription.name;
					}
				});
			});
		});

		this._socket.getImage().subscribe(event => {
			const frame = this.imageList.find(item => item.id == event.id);

			if (frame != null && event.data != null) {
				frame.data = 'data:image/jpg;base64,' + event.data;
			}
		});
	}

	public savePicture(frame: Image): void {
		const data = frame.data.replace('data:image/jpg;base64,', '');
		this._http.savePicture(frame.id, data).subscribe(data => {
			if (data.result) {
				this._alert.showToast('toast.info.success');
			}
		});
	}

	public ngOnDestroy(): void {
		this._socket.disconnect();
	}

}
