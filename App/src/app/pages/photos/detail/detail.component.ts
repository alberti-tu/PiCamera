import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent, IDialogData, IDialogResult } from 'src/app/components/dialog/dialog.component';
import { ICameraSubscription, Image } from 'src/app/models/http.models';
import { AlertService } from 'src/app/services/alert/alert.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
	selector: 'app-detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

	public subscription: ICameraSubscription = {};
	public pictures?: Image[] = undefined;

	constructor(private route: ActivatedRoute, private alert: AlertService, private http: HttpService, private router: Router) {}

	public ngOnInit(): void {
		this.subscription.camera_id = this.route.snapshot.params['id'];

		if (this.subscription.camera_id == undefined) {
			return;
		}

		this.http.getOneSubscription(this.subscription.camera_id).subscribe(data => {
			this.subscription = data?.result;

			if (this.subscription.camera_id == undefined) {
				return;
			}

			this.http.getFolderId(this.subscription.camera_id).subscribe(data => {
				this.pictures = data.result.map<Image>(item => ({ name: item }));

				this.pictures.forEach(item => {
					if (this.subscription.camera_id == undefined || item.name == undefined) {
						return;
					}

					this.http.getPicture(this.subscription.camera_id, item.name).subscribe(data => {
						if (data?.result != null) {
							item.data = 'data:image/jpg;base64,'+ data?.result;
						}
					});
				});
			});
		});
	}

	public async remove(picture: Image, event?: MouseEvent) {
		event?.stopPropagation();

		const dialog: IDialogData = {
			title: 'photos.remove.title',
			message: 'photos.remove.description',
			buttons: [
				{ name: 'button.cancel', type: 'button', value: 'cancel' },
				{ name: 'button.accept', type: 'submit', value: 'accept' },
			]
		};

		(await this.alert.showDialog(DialogComponent, { data: dialog })).afterClosed$.subscribe((result: IDialogResult<unknown>) => {
			if (this.subscription?.camera_id != undefined && picture.name != undefined && result?.button?.value == 'accept') {
				this.http.removePicture(this.subscription.camera_id, picture.name).subscribe(data => {
					if (data?.result) {
						this.pictures = this.pictures?.filter(item => item?.name != picture?.name);
						this.alert.showToast('toast.info.deleted', 'info');
					}
				});
			}
		});
	}
}
