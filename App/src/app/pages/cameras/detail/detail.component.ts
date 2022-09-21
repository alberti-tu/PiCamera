import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppURL } from 'src/app/constants/routes';
import { ICameraOptions, ICameraSubscription } from 'src/app/models/http.models';
import { AlertService } from 'src/app/services/alert/alert.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
	selector: 'app-detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

	public camera: ICameraSubscription = {};
	public options: ICameraOptions = { filter: 'auto', quality: 0, rotation: 0 };
	public filters: string[] = [];

	constructor(private route: ActivatedRoute, private alert: AlertService, private http: HttpService, private router: Router) { }

	public ngOnInit(): void {
		this.camera.id = this.route.snapshot.params['id'];

		if (this.camera.id == undefined) {
			return;
		}

		this.http.getOneSubscription(this.camera.id).subscribe(data => {
			this.camera = data?.result;
		});

		this.http.getSettings(this.camera.id).subscribe(data => {
			this.options = data?.result;
		});

		this.http.getFilters().subscribe(data => {
			this.filters = data?.result;
		});
	}

	public save(form: ICameraOptions): void {
		if (this.camera?.id == undefined || form?.rotation == undefined) {
			return;
		}

		form.rotation = form.rotation % 360;

		this.http.saveSettings(this.camera.id, form).subscribe(data => {
			if (data?.result) {
				this.alert.showToast('toast.info.saved', 'info');
				this.router.navigateByUrl(AppURL.CAMERAS);
			}
		});
	}

}
