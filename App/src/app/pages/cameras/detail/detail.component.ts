import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PictureOptions } from 'src/app/models/http.models';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

	public camera: PictureOptions = { filter: '', quality: 0, rotation: 0 };;

	public cameraId: string = null;
	public cameraName: string = '';

	public filtersList: string[] = [];

	constructor(private _http: HttpService, private _route: ActivatedRoute) { }

	public ngOnInit(): void {
		this.cameraId = this._route.snapshot.params.id;

		this._http.getOneSubscription(this.cameraId).subscribe(data => {
			this.cameraName = data.result.name;
		});

		this._http.getCamera(this.cameraId).subscribe(data => {
			this.camera = data.result;
		});

		this._http.getFilters().subscribe(data => {
			this.filtersList = data.result;
		});
	}

	public saveSettings(form: PictureOptions): void {
		form.rotation = form.rotation % 360;

		console.log(form)
	}
}
