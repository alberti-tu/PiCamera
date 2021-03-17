import { Component, OnDestroy, OnInit } from '@angular/core';
import { FrameStream } from 'src/app/models/http.models';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

	public pictures: FrameStream[] = [];

	constructor(private _socket: SocketService) { }

	public ngOnInit(): void {
		this._socket.connect();

		this._socket.getSubscriptions().subscribe(data => {
			this.pictures = data.map<FrameStream>(item => ({ id: item, data: null }));
		});

		this._socket.getImage().subscribe(image => {
			const frame = this.pictures.find(item => item.id == image.id);

			if (frame != null && image.data != null) {
				frame.data = 'data:image/jpg;base64,' + image.data;
			} else {
				frame.data = 'assets/images/error_404.jpg';
			}
		});
	}

	public ngOnDestroy(): void {
		this._socket.disconnect();
	}

}
