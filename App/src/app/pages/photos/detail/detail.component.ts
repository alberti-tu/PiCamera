import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogData } from 'src/app/components/dialog/dialog.component';
import { Image } from 'src/app/models/http.models';
import { AlertService } from 'src/app/services/alert/alert.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

	public cameraId: string = null;
	public cameraName: string = '';

	public imageList: Image[] = [];

	constructor(private _alert: AlertService, private _http: HttpService, private _route: ActivatedRoute) { }

	public ngOnInit(): void {
		this.cameraId = this._route.snapshot.params.id;

		this._http.getOneSubscription(this.cameraId).subscribe(data => {
			this.cameraName = data.result.name;
		});

		this._http.getFolderId(this.cameraId).subscribe(data => {
			this.imageList = data.result.map<Image>(item => ({ name: item }));
		});
	}

	public remove(image: Image) {
		const options: DialogData = {
			header: 'photos.remove.header',
			buttons: [
				{ text: 'photos.remove.button.cancel', value: 'cancel' },
				{ text: 'photos.remove.button.accept', value: 'ok', isPrimary: true }
			]
		};
		this._alert.showDialog(options).subscribe(result => {
			if (result == null || result.button == 'cancel') {
				return;
			}

			this._http.removePicture(this.cameraId, image.name).subscribe(data => {
				if (data.result) {
					this.imageList = this.imageList.filter(item => item.name != image.name);
				}
			});
		});
	}
}
