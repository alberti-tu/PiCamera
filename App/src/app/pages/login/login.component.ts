import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { IFormButton, IFormField, IFormResult } from 'src/app/components/form/form.component';
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

	public buttons: IFormButton[];
	public fields: IFormField[];

	constructor(private alert: AlertService, private auth: AuthenticationService, private http: HttpService) {
		this.buttons = [
			{ name: 'button.signIn', type: 'submit', value: 'accept' },
		];

		this.fields = [
			{
				id: 'username',
				icon: 'user',
				label: 'login.username',
				requisites: [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ],
				type: 'text',
			},
			{
				id: 'password',
				label: 'login.password',
				requisites: [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ],
				type: 'password',
			}
		];
	}

	public login(result?: IFormResult): void {
		if (result?.form == undefined) {
			return;
		}

		const username = result.form['username'].toString();
		const password = result.form['password'].toString();

		this.http.login(username, this.auth.hash(password)).subscribe(data => {
			this.auth.setToken(data);
		});
	}

}
