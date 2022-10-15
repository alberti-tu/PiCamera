import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IFormButton, IFormField, IFormResult } from 'src/app/components/form/form.component';
import { AppURL } from 'src/app/constants/routes';
import { CustomValidator } from 'src/app/global/utils';
import { AlertService } from 'src/app/services/alert/alert.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

	public buttons: IFormButton[];
	public fields: IFormField[];

	constructor(private alert: AlertService, private http: HttpService, private router: Router) {
		this.buttons = [
			{ name: 'button.signUp', type: 'submit', value: 'accept' },
		];

		this.fields = [
			{
				id: 'username',
				icon: 'user',
				label: 'register.username',
				requisites: [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ],
				type: 'text',
			},
			{
				id: 'password1',
				label: 'register.password-1',
				requisites: [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ],
				type: 'password',
			},
			{
				id: 'password2',
				label: 'register.password-2',
				requisites: [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ],
				type: 'password',
			}
		]
	}

	public register(result?: IFormResult): void {
		if (result?.form == undefined) {
			return;
		}

		const username = result.form['username'].toString();
		const password1 = result.form['password1'].toString();
		const password2 = result.form['password2'].toString();

		if (password1 != password2) {
			this.alert.showToast('toast.error.differentPassword', 'error');
			return;
		}

		this.http.register(username, password1).subscribe(data => {
			if (data?.result) {
				this.alert.showToast('toast.success.register', 'success');
				this.router.navigateByUrl(AppURL.LOGIN);
			} else {
				this.alert.showToast('toast.error.register', 'error');
			}
		});
	}

}
