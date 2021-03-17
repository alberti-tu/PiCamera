import { Component, OnDestroy, OnInit } from '@angular/core';
import { FrameStream } from 'src/app/models/http.models';
import { HttpService } from 'src/app/services/http/http.service';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

	public imageList: FrameStream[] = [];

	constructor(private _http: HttpService, private _socket: SocketService) { }

	public ngOnInit(): void {
		this._socket.connect();

		this._socket.getSubscriptions().subscribe(event => {
			this.imageList = event.map<FrameStream>(item => ({ id: item, name: null, data: 'assets/images/error_404.jpg' }));

			this._http.getSubscriptions().subscribe(data => {
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

	public ngOnDestroy(): void {
		this._socket.disconnect();
	}

}
