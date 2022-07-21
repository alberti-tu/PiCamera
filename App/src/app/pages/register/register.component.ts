import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppURL } from 'src/app/constants/routes';
import { CustomValidator } from 'src/app/global/utils';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

	public form: FormGroup;
	public showPassword1: boolean;
	public showPassword2: boolean;

	constructor(private _alert: AlertService, private _auth: AuthenticationService, private _formBuilder: FormBuilder, private _http: HttpService, private _router: Router) {
		this.form = this._formBuilder.group({
			username: [ '', [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ] ],
			password1: [ '', [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ] ],
			password2: [ '', [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ] ],
		});

		this.showPassword1 = false;
		this.showPassword2 = false;
	}

	public hasError(name: string, error: string): boolean {
		const control = this.form.get(name);
		return control && control?.touched && control.errors && control.errors[error];
	}

	public password1Button(): void {
		this.showPassword1 = !this.showPassword1;
	}

	public password2Button(): void {
		this.showPassword2 = !this.showPassword2;
	}

	public ngOnInit(): void {
		this.form = this._formBuilder.group({
			username: [ '', [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ] ],
			password1: [ '', [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ] ],
			password2: [ '', [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ] ],
		});
	}

	public sendForm(): void {
		if (this.form.value.password1 != this.form.value.password2) {
			this._alert.showToast('toast.error.differentPassword', { delay: 5000, state: 'danger' });
			return;
		}

		const username = this.form.value.username;
		const password = this.form.value.password1;

		this._http.register(username, password).subscribe(data => {
			if (data.result) {
				this._alert.showToast('toast.info.success', { delay: 5000, state: 'success' });
				this._router.navigateByUrl(AppURL.LOGIN);
			} else {
				this._alert.showToast('toast.error.register', { delay: 5000, state: 'danger' });
			}
		});
	}

}
