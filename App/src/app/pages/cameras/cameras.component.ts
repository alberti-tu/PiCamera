import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogData } from 'src/app/components/dialog/dialog.component';
import { CameraSubscription } from 'src/app/models/http.models';
import { AlertService } from 'src/app/services/alert/alert.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
	selector: 'app-cameras',
	templateUrl: './cameras.component.html',
	styleUrls: ['./cameras.component.scss']
})
export class CamerasComponent implements OnInit {

	public cameras: CameraSubscription[] = [];
	public form: FormGroup;

	constructor(private _alert: AlertService, private _formBuilder: FormBuilder, private _http: HttpService, private _router: Router) {
		this.form = this._formBuilder.group({
			camera: [ '', Validators.required ]
		});
	}

	public ngOnInit(): void {
		this.getData();
	}

	public sendForm(): void {
		const camera = this.form.value.camera;
		this._http.addSubscription(camera).subscribe(data => {
			if (data && data.result) {
				this.getData();
			} else {
				this._alert.showToast('toast.error.notAdded');
			}
		});
		this.form.reset();
	}

	public getData(): void {
		this._http.getSubscriptions().subscribe(data => {
			this.cameras = data.result;
		});
	}

	public open(camera: CameraSubscription): void {
		this._router.navigateByUrl('cameras/' + camera.camera_id);
	}

	public edit(camera: CameraSubscription): void {
		const options: DialogData = {
			header: 'cameras.edit.header',
			message: 'cameras.edit.message',
			inputs: [
				{ text: 'cameras.edit.input.text', value: camera.name }
			],
			buttons: [
				{ text: 'cameras.edit.button.cancel', value: 'cancel' },
				{ text: 'cameras.edit.button.accept', value: 'ok', isPrimary: true }
			]
		};
		this._alert.showDialog(options).subscribe(result => {
			if (result == null || result.inputs[0].value == '' || result.button == 'cancel') {
				return;
			}

			this._http.updateSubscription(camera.id, result.inputs[0].value).subscribe(data => {
				if (data.result) {
					camera.name = result.inputs[0].value;
				}
			});
		});
	}

	public remove(camera: CameraSubscription): void {
		const options: DialogData = {
			header: 'cameras.remove.header',
			message: 'cameras.remove.message',
			buttons: [
				{ text: 'cameras.remove.button.cancel', value: 'cancel' },
				{ text: 'cameras.remove.button.accept', value: 'ok', isPrimary: true }
			]
		};
		this._alert.showDialog(options).subscribe(result => {
			if (result == null || result.button == 'cancel') {
				return;
			}

			this._http.removeSubscription(camera.id).subscribe(data => {
				if (data.result) {
					this.cameras = this.cameras.filter(item => item.camera_id != camera.camera_id);
				}
			});
		});
	}
}
