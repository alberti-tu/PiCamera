import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IFormField } from 'src/app/components/form/form.component';
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

	public fields: IFormField[];
	public form?: Record<string, string> = undefined;

	constructor(private alert: AlertService, private http: HttpService, private router: Router) {
		this.fields = [
			{
				id: 'username',
				label: 'register.username',
				icon: 'user',
				type: 'text',
				requisites: [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ]
			},
			{
				id: 'password1',
				label: 'register.password-1',
				type: 'password',
				requisites: [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ]
			},
			{
				id: 'password2',
				label: 'register.password-2',
				type: 'password',
				requisites: [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ]
			}
		]
	}

	public register(): void {
		if (this.form == undefined) {
			return;
		}

		const username = this.form['username'];
		const password1 = this.form['password1'];
		const password2 = this.form['password2'];

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
