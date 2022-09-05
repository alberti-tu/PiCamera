import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/global/utils';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

	public form: FormGroup;
	public showPassword: boolean = false;
	public showPassword1: boolean = false;
	public showPassword2: boolean = false;

	public user: any = null;

	constructor(private alert: AlertService, private auth: AuthenticationService, private formBuilder: FormBuilder, private http: HttpService) {
		this.form = this.formBuilder.group({
			username: [ '', [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ] ],
			password: [ '', [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ] ],
			password1: [ '', [ Validators.minLength(8), CustomValidator.whiteSpace ] ],
			password2: [ '', [ Validators.minLength(8), CustomValidator.whiteSpace ] ],
		});
	}

	public ngOnInit(): void {
		this.http.getUser().subscribe(data => {
			this.user = data?.result;
			this.form.get('username')?.setValue(this.user?.username);	
		})
	}

	public sendForm(): void {
		if (this.user?.password != this.auth.hash(this.form.value.password)) {
			this.alert.showToast('toast.error.confirmPassword', 'error');
			return;
		}

		if (this.form.value.password1 != this.form.value.password2) {
			this.alert.showToast('toast.error.differentPassword', 'error');
			return;
		}

		const username = this.form.value.username;
		const password = this.form.value.password1 || this.form.value.password;

		this.http.updateUser(username, password).subscribe(data => {
			if (data?.result) {
				this.alert.showToast('toast.info.saved', 'success');
			} else {
				this.alert.showToast('toast.error.update', 'error');
			}
		});
	}

	public remove(): void {
		/*
		const options: DialogData = {
			header: 'settings.remove.header',
			message: 'settings.remove.message',
			buttons: [
				{ text: 'settings.remove.button.cancel', value: 'cancel' },
				{ text: 'settings.remove.button.accept', value: 'ok', isPrimary: true }
			]
		};
		this.alert.showDialog(options).subscribe(result => {
			if (result == null || result.button == 'cancel') {
				return;
			}

			this.http.removeUser().subscribe(data => {
				if (data.result) {
					this.alert.showToast('toast.success.deleteUser', 'success');
					this.auth.removeToken();
				}
			});

		});
		*/

		this.http.removeUser().subscribe(data => {
			if (data?.result) {
				this.alert.showToast('toast.success.deleteUser', 'success');
				this.auth.removeToken();
			}
		});
	}

	public passwordButton(): void {
		this.showPassword = !this.showPassword;
	}

	public password1Button(): void {
		this.showPassword1 = !this.showPassword1;
	}

	public password2Button(): void {
		this.showPassword2 = !this.showPassword2;
	}

	public hasError(name: string, error: string): boolean {
		const control = this.form.get(name);
		return control && control.touched && control.errors && control.errors[error];
	}
}
