import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogComponent, IDialogData, IDialogResult } from 'src/app/components/dialog/dialog.component';
import { IFormButton, IFormField, IFormResult } from 'src/app/components/form/form.component';
import { AppURL } from 'src/app/constants/routes';
import { CustomValidator, getPath } from 'src/app/global/utils';
import { ICameraSubscription } from 'src/app/models/http.models';
import { AlertService } from 'src/app/services/alert/alert.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
	selector: 'app-cameras',
	templateUrl: './cameras.component.html',
	styleUrls: ['./cameras.component.scss']
})
export class CamerasComponent implements OnInit {

	public buttons: IFormButton[];
	public fields: IFormField[];

	public subscriptions: ICameraSubscription[] = [];

	constructor(private alert: AlertService, private http: HttpService, private router: Router) {
		this.buttons = [
			{ name: 'button.save', type: 'submit', value: 'accept' },
		];

		this.fields = [
			{
				id: 'camera',
				label: 'cameras.input',
				requisites: [ Validators.required ],
				type: 'text',
			}
		];
	}

	public ngOnInit(): void {
		this.getData();
	}

	public getData(): void {
		this.http.getAllSubscriptions().subscribe(data => {
			this.subscriptions = data?.result;
		});
	}

	public save(result?: IFormResult): void {
		if (result?.form == undefined) {
			return;
		}

		this.http.addSubscription(result?.form['camera'].toString()).subscribe(data => {
			if (data?.result) {
				this.getData();
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
			form: [
				{
					id: 'name',
					label: 'cameras.edit.description',
					requisites: [ Validators.required, CustomValidator.whiteSpace ],
					type: 'text',
					value: camera?.name,
				},
			],
			buttons: [
				{ name: 'button.cancel', type: 'button', value: 'cancel' },
				{ name: 'button.accept', type: 'submit', value: 'accept' },
			]
		};

		(await this.alert.showDialog(DialogComponent, { data: dialog })).afterClosed$.subscribe((result: IDialogResult<Record<string, string>>) => {
			if (result?.button?.value == 'accept') {
				if (camera?.id != undefined && result?.data != undefined) {
					const name = result?.data['name'];

					this.http.updateSubscription(camera?.id, name).subscribe(data => {
						if (data?.result) {
							camera.name = name;
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
				{ name: 'button.cancel', type: 'button', value: 'cancel' },
				{ name: 'button.accept', type: 'submit', value: 'accept' },
			]
		};

		(await this.alert.showDialog(DialogComponent, { data: dialog })).afterClosed$.subscribe((result: IDialogResult<unknown>) => {
			if (result?.button?.value == 'accept') {
				if (camera?.id != undefined) {
					this.http.removeSubscription(camera?.id).subscribe(data => {
						if (data?.result) {
							this.subscriptions = this.subscriptions?.filter(item => item?.camera_id != camera?.camera_id);
							this.alert.showToast('toast.info.deleted', 'info');
						}
					});
				}
			}
		});
	}
}
