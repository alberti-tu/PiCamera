import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppURL } from 'src/app/constants/routes';
import { getPath } from 'src/app/global/utils';
import { ICameraSubscription } from 'src/app/models/http.models';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
	selector: 'app-photos',
	templateUrl: './photos.component.html',
	styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

	public subscriptions: ICameraSubscription[] = [];

	constructor(private http: HttpService, private router: Router) { }

	public ngOnInit(): void {
		this.http.getAllSubscriptions().subscribe(data => {
			this.subscriptions = data?.result;
		});
	}

	public open(camera: ICameraSubscription, event?: MouseEvent): void {
		event?.stopPropagation();

		if (camera?.camera_id != undefined) {
			this.router.navigateByUrl(getPath(AppURL.PHOTOS_DETAIL, { id: camera?.camera_id }));
		}
	}
}
