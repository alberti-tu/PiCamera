import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CameraSubscription } from 'src/app/models/http.models';
import { AlertService } from 'src/app/services/alert/alert.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
	templateUrl: './photos.component.html',
	styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

	public cameras: CameraSubscription[] = [];

	constructor(private _alert: AlertService, private _http: HttpService, private _router: Router) { }

	public ngOnInit(): void {
		this._http.getAllSubscriptions().subscribe(data => {
			this.cameras = data.result;
		});
	}

	public open(camera: CameraSubscription): void {
		this._router.navigateByUrl('photos/' + camera.camera_id);
	}

}
