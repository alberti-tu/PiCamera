import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppURL } from 'src/app/constants/routes';
import { getPath } from 'src/app/global/utils';
import { ICameraSubscription } from 'src/app/models/http.models';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
	selector: 'app-gallery',
	templateUrl: './gallery.component.html',
	styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

	public subscriptions?: ICameraSubscription[] = undefined;

	constructor(private http: HttpService, private router: Router) { }

	public ngOnInit(): void {
		this.http.getAllSubscriptions().subscribe(data => {
			this.subscriptions = data;
		});
	}

	public open(camera: ICameraSubscription, event?: MouseEvent): void {
		event?.stopPropagation();

		if (camera?.camera_id != undefined) {
			this.router.navigateByUrl(getPath(AppURL.GALLERY_DETAIL, { id: camera?.camera_id }));
		}
	}
}
