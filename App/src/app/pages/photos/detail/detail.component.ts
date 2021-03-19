import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
		this._http.removePicture(this.cameraId, image.name).subscribe(data => {
			if (data.result) {
				this._alert.showToast('toast.info.success');
			}
		});
	}
}
