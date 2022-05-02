import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/global/utils';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	public form: FormGroup;
	public showPassword: boolean;

	constructor(private _auth: AuthenticationService, private _formBuilder: FormBuilder, private _http: HttpService) {
		this.form = this._formBuilder.group({
			username: [ '', [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ] ],
			password: [ '', [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ] ]
		});

		this.showPassword = false;
	}

	public hasError(name: string, error: string): boolean {
		const control = this.form.get(name);
		return control && control.touched && control.errors && control.errors[error];
	}

	public passwordButton(): void {
		this.showPassword = !this.showPassword;
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
				// this._alert.showToast('toast.error.login');
			}
		});
	}

}
