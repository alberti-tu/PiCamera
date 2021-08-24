import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogData } from 'src/app/components/dialog/dialog.component';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { HttpService } from 'src/app/services/http/http.service';
import { CustomValidator } from 'src/app/components/utils';

@Component({
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

	public form: FormGroup;
	public showPassword1: boolean;
	public showPassword2: boolean;

	constructor(private _alert: AlertService, private _auth: AuthenticationService, private _formBuilder: FormBuilder, private _http: HttpService) { }

	public ngOnInit(): void {
		this.form = this._formBuilder.group({
			username: [ '', [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ] ],
			password1: [ '', [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ] ],
			password2: [ '', [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ] ],
		});
	}

	public sendForm(): void {
		if (this.form.value.password1 != this.form.value.password2) {
			this._alert.showToast('toast.error.differentPassword');
			return;
		}

		const username = this.form.value.username;
		const password = this.form.value.password1

		this._http.updateUser(username, password).subscribe(data => {
			if (data.result) {
				this._alert.showToast('toast.info.success');
			} else {
				this._alert.showToast('toast.error.update');
			}
		});
	}

	public remove(): void {
		const options: DialogData = {
			header: 'settings.remove.header',
			message: 'settings.remove.message',
			buttons: [
				{ text: 'settings.remove.button.cancel', value: 'cancel' },
				{ text: 'settings.remove.button.accept', value: 'ok', isPrimary: true }
			]
		};
		this._alert.showDialog(options).subscribe(result => {
			if (result == null || result.button == 'cancel') {
				return;
			}

			this._http.removeUser().subscribe(data => {
				if (data.result) {
					this._auth.removeToken();
				}
			});

		});
	}

	public password1Button(): any {
		this.showPassword1 = !this.showPassword1;
	}

	public password2Button(): any {
		this.showPassword2 = !this.showPassword2;
	}

	public hasError(name: string, error: string): boolean {
		const control = this.form.get(name);
		return control && control.touched && control.errors && control.errors[error];
	}

}
