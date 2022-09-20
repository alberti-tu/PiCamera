import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { IFormField } from 'src/app/components/form/form.component';
import { CustomValidator } from 'src/app/global/utils';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	public fields: IFormField[];
	public form?: Record<string, string> = undefined;

	constructor(private alert: AlertService, private auth: AuthenticationService, private http: HttpService) {
		this.fields = [
			{
				id: 'username',
				label: 'login.username',
				icon: 'user',
				type: 'text',
				requisites: [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ]
			},
			{
				id: 'password',
				label: 'login.password',
				type: 'password',
				requisites: [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ]
			}
		]
	}

	public login(): void {
		if (this.form == undefined) {
			return;
		}

		const username = this.form['username'];
		const password = this.form['password'];

		this.http.login(username, this.auth.hash(password)).subscribe(data => {
			if (data?.result) {
				this.auth.setToken(data?.result);
			} else {
				this.alert.showToast('toast.error.login', 'error');
				this.auth.removeToken();	
			}
		});
	}

}
