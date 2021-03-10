import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CameraSubscription } from 'src/app/models/http.models';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
	selector: 'app-cameras',
	templateUrl: './cameras.component.html',
	styleUrls: ['./cameras.component.scss']
})
export class CamerasComponent implements OnInit {

	public cameras: CameraSubscription[] = [];
	public form: FormGroup;

	constructor(private _formBuilder: FormBuilder, private _http: HttpService) {
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
			if (data.result) {
				this.getData();
			}
		});
		this.form.reset();
	}

	public getData() {
		this._http.getSubscriptions().subscribe(data => {
			this.cameras = data.result;
		});
	}

	public remove(camera: CameraSubscription) {
		this._http.removeSubscription(camera.id).subscribe(data => {
			if (data.result) {
				this.cameras = this.cameras.filter(item => item.camera_id != camera.camera_id);
			}
		});
	}
}
