import { Component, OnInit } from '@angular/core';
import { CameraSubscription } from 'src/app/models/http.models';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
	selector: 'app-cameras',
	templateUrl: './cameras.component.html',
	styleUrls: ['./cameras.component.scss']
})
export class CamerasComponent implements OnInit {

	public cameras: CameraSubscription[] = [];

	constructor(private _http: HttpService) { }

	public ngOnInit(): void {
		this._http.getSubscriptions().subscribe(data => this.cameras = data.result);
	}

}
