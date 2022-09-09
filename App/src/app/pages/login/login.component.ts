import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

	public form: FormGroup;
	public showPassword: boolean;

	constructor(private alert: AlertService, private auth: AuthenticationService, private formBuilder: FormBuilder, private http: HttpService) {
		this.form = this.formBuilder.group({
			username: [ '', [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ] ],
			password: [ '', [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ] ]
		});

		this.showPassword = false;
	}

	public hasError(name: string, error: string): boolean {
		const control = this.form.get(name);
		return control && control?.touched && control.errors && control.errors[error];
	}

	public passwordButton(): void {
		this.showPassword = !this.showPassword;
	}

	public sendForm(): void {
		const username = this.form.value.username;
		const password = this.auth.hash(this.form.value.password);

		this.http.login(username, password).subscribe(data => {
			if (data?.result) {
				this.auth.setToken(data?.result);
			} else {
				this.alert.showToast('toast.error.login', 'error');
				this.auth.removeToken();	
			}
		});
	}

}
