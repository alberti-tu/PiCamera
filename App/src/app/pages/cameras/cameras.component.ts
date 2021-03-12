import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

	constructor(private _alert: AlertService, private _formBuilder: FormBuilder, private _http: HttpService) {
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

	public getData() {
		this._http.getSubscriptions().subscribe(data => {
			this.cameras = data.result;
		});
	}

	public edit(camera: CameraSubscription) {

	}

	public remove(camera: CameraSubscription) {
		const options: DialogData = {
			header: 'cameras.header',
			message: 'cameras.message',
			buttons: [
				{ name: 'cameras.button.cancel', value: 'cancel' },
				{ name: 'cameras.button.accept', value: 'ok', isPrimary: true }
			]
		};
		this._alert.showDialog(options).subscribe(button => {
			if (button == null || button == 'cancel') {
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
