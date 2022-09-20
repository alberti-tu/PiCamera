import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogConfirmComponent } from 'src/app/components/dialogs/dialog-confirm/dialog-confirm.component';
import { AppURL } from 'src/app/constants/routes';
import { getPath } from 'src/app/global/utils';
import { IDialogData, IDialogResult } from 'src/app/models/global';
import { ICameraSubscription } from 'src/app/models/http.models';
import { AlertService } from 'src/app/services/alert/alert.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
	selector: 'app-cameras',
	templateUrl: './cameras.component.html',
	styleUrls: ['./cameras.component.scss']
})
export class CamerasComponent implements OnInit {

	public cameras: ICameraSubscription[] = [];
	public form: FormGroup;

	constructor(private alert: AlertService, private formBuilder: FormBuilder, private http: HttpService, private router: Router) {
		this.form = this.formBuilder.group({
			camera: [ '', Validators.required ]
		});
	}

	public ngOnInit(): void {
		this.getData();
	}

	public getData(): void {
		this.http.getAllSubscriptions().subscribe(data => {
			this.cameras = data?.result;
		});
	}

	public sendForm(): void {
		this.http.addSubscription(this.form.value.camera).subscribe(data => {
			if (data?.result) {
				this.getData();
				this.form.reset();
				this.alert.showToast('toast.info.saved', 'info');
			} else {
				this.alert.showToast('toast.error.notAdded', 'error');
			}
		});
	}

	public openCamera(camera: ICameraSubscription, event?: MouseEvent): void {
		event?.stopPropagation();

		if (camera?.camera_id != undefined) {
			this.router.navigateByUrl(getPath(AppURL.CAMERAS_DETAIL, { id: camera?.camera_id }));
		}
	}

	public async editCamera(camera: ICameraSubscription, event?: MouseEvent): Promise<void> {
		event?.stopPropagation();

		const dialog: IDialogData = {
			title: 'cameras.edit.title',
			message: 'cameras.edit.description',
			buttons: [
				{ name: 'button.cancel', type: 'secondary', value: 'cancel' },
				{ name: 'button.accept', type: 'primary', value: 'accept' },
			]
		};

		(await this.alert.showDialog(DialogConfirmComponent, { data: dialog })).afterClosed$.subscribe((result: IDialogResult<string>) => {
			if (result?.button?.value == 'accept') {
				if (camera?.id != undefined && result?.data != undefined) {
					this.http.updateSubscription(camera?.id, result?.data).subscribe(data => {
						if (data?.result) {
							camera.name = result?.data;
							this.alert.showToast('toast.info.saved', 'info');
						}
					});
				}
			}
		});
	}

	public async removeCamera(camera: ICameraSubscription, event?: MouseEvent): Promise<void> {
		event?.stopPropagation();

		const dialog: IDialogData = {
			title: 'cameras.remove.title',
			message: 'cameras.remove.description',
			buttons: [
				{ name: 'button.cancel', type: 'secondary', value: 'cancel' },
				{ name: 'button.accept', type: 'primary', value: 'accept' },
			]
		};

		(await this.alert.showDialog(DialogConfirmComponent, { data: dialog })).afterClosed$.subscribe((result: IDialogResult<unknown>) => {
			if (result?.button?.value == 'accept') {
				if (camera?.id != undefined) {
					this.http.removeSubscription(camera?.id).subscribe(data => {
						if (data?.result) {
							this.cameras = this.cameras?.filter(item => item?.camera_id != camera?.camera_id);
							this.alert.showToast('toast.info.deleted', 'info');
						}
					});
				}
			}
		});
	}
}
