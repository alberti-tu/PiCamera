import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IFormButton, IFormField, IFormResult } from 'src/app/components/form/form.component';
import { AppURL } from 'src/app/constants/routes';
import { IKeyValue } from 'src/app/models/global';
import { ICameraSubscription } from 'src/app/models/http.models';
import { AlertService } from 'src/app/services/alert/alert.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
	selector: 'app-detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

	public subscription: ICameraSubscription = {};

	public buttons: IFormButton[];
	public fields: IFormField[];

	constructor(private route: ActivatedRoute, private alert: AlertService, private http: HttpService, private router: Router) {
		this.buttons = [
			{ name: 'button.save', type: 'submit', value: 'accept' },
		];

		this.fields = [
			{
				id: 'filter',
				label: 'cameras.detail.filter',
				type: 'dropdown',
				value: 'auto',
				requisites: [ Validators.required ]
			},
			{
				id: 'quality',
				label: 'cameras.detail.quality',
				type: 'range',
				value: '0',
				max: '100',
				min: '0',
				step: '1',
				requisites: [ Validators.required ]
			},
			{
				id: 'rotation',
				label: 'cameras.detail.rotation',
				type: 'range',
				value: '0',
				max: '360',
				min: '0',
				step: '90',
				requisites: [ Validators.required ]
			}
		];
	}

	public ngOnInit(): void {
		this.subscription.camera_id = this.route.snapshot.params['id'];

		if (this.subscription.camera_id == undefined) {
			return;
		}

		this.http.getOneSubscription(this.subscription.camera_id).subscribe(data => {
			this.subscription = data?.result;
		});

		this.http.getSettings(this.subscription.camera_id).subscribe(data => {
			Object.keys(data?.result).forEach(key => {
				const field = this.fields.find(field => field.id == key)
				
				if (field != undefined) {
					field.value = data?.result[key]?.toString();
				}
			})
		});

		this.http.getFilters().subscribe(data => {
			const field = this.fields.find(field => field.id == 'filter')
			
			if (field != undefined) {
				field.params = data?.result?.map<IKeyValue>(param => ({ key: param, value: 'cameras.detail.filters.' + param }));
			}
		});
	}

	public save(result?: IFormResult): void {
		if (this.subscription?.camera_id == undefined || result?.form == undefined) {
			return;
		}

		result.form['rotation'] = +result.form['rotation'] % 360;

		this.http.saveSettings(this.subscription.camera_id, result.form).subscribe(data => {
			if (data?.result) {
				this.alert.showToast('toast.info.saved', 'info');
				this.router.navigateByUrl(AppURL.CAMERAS);
			}
		});
	}

}
