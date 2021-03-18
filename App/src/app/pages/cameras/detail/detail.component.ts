import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PictureOptions } from 'src/app/models/http.models';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

	public camera: PictureOptions = null;

	public cameraId: string = null;
	public cameraName: string = '';

	constructor(private _http: HttpService, private _route: ActivatedRoute) { }

	public ngOnInit(): void {
		this.cameraId = this._route.snapshot.params.id;

		this._http.getOneSubscription(this.cameraId).subscribe(data => {
			this.cameraName = data.result.name;
		});

		this._http.getCamera(this.cameraId).subscribe(data => {
			this.camera = data.result;
		});
	}

}
