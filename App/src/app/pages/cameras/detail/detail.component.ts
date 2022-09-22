import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IFormField } from 'src/app/components/form/form.component';
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

	public item: ICameraSubscription = {};

	public fields: IFormField[];
	public form?: Record<string, string | number> = undefined;

	constructor(private route: ActivatedRoute, private alert: AlertService, private http: HttpService, private router: Router) {
		this.fields = [
			{
				id: 'filter',
				label: 'cameras.detail.filter',
				type: 'text',
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
		this.item.camera_id = this.route.snapshot.params['id'];

		if (this.item.camera_id == undefined) {
			return;
		}

		this.http.getOneSubscription(this.item.camera_id).subscribe(data => {
			this.item = data?.result;
		});

		this.http.getSettings(this.item.camera_id).subscribe(data => {
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
				field.params = data?.result?.map<IKeyValue>(param => ({ key: param, value: param }));
			}
		});
	}

	public save(): void {
		if (this.item?.camera_id == undefined || this.form == undefined) {
			return;
		}

		this.form['rotation'] = +this.form['rotation'] % 360;

		this.http.saveSettings(this.item.camera_id, this.form).subscribe(data => {
			if (data?.result) {
				this.alert.showToast('toast.info.saved', 'info');
				this.router.navigateByUrl(AppURL.CAMERAS);
			}
		});
	}

}
