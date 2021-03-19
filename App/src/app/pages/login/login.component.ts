import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { HttpService } from 'src/app/services/http/http.service';
import { CustomValidator } from 'src/app/components/utils';

@Component({
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	public form: FormGroup;
	public showPassword: boolean;

	constructor(private _alert: AlertService, private _auth: AuthenticationService, private _formBuilder: FormBuilder, private _http: HttpService) { }

	public ngOnInit(): void {
		this.form = this._formBuilder.group({
			username: [ '', [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ] ],
			password: [ '', [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ] ]
		});
	}

	public sendForm(): void {
		const username = this.form.value.username;
		const password = this._auth.hash(this.form.value.password);

		this._http.login(username, password).subscribe(data => {
			if (data.result) {
				this._auth.setToken(data.result);
				this.form.reset();
			} else {
				this._auth.removeToken();
				this._alert.showToast('toast.error.login');
			}
		});
	}

	public passwordButton(): any {
		this.showPassword = !this.showPassword;
	}

	public hasError(name: string, error: string): boolean {
		const control = this.form.get(name);
		return control && control.touched && control.errors && control.errors[error];
	}

}
