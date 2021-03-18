import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

	public camera_id: string = null;
	public camera_name: string = '';

	constructor(private _http: HttpService, private _route: ActivatedRoute) { }

	public ngOnInit(): void {
		this.camera_id = this._route.snapshot.params.id;
		this.camera_name = this.camera_id;
	}

}
