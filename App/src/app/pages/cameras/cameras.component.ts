import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

	public sendForm(): void {
		this.http.addSubscription(this.form.value.camera).subscribe(data => {
			if (data?.result) {
				this.getData();
				this.form.reset();
			} else {
				this.alert.showToast('toast.error.notAdded', 'error');
			}
		});
	}

	public getData(): void {
		this.http.getAllSubscriptions().subscribe(data => {
			this.cameras = data?.result;
		});
	}

}
