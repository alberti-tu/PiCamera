import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckPasswordComponent } from 'src/app/components/dialogs/check-password/check-password.component';
import { DialogConfirmComponent } from 'src/app/components/dialogs/dialog-confirm/dialog-confirm.component';
import { AppURL } from 'src/app/constants/routes';
import { CustomValidator } from 'src/app/global/utils';
import { IDialogData, IDialogResult, IUser } from 'src/app/models/global';
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
	public showPassword1: boolean = false;
	public showPassword2: boolean = false;

	public user: IUser | undefined = undefined;
	public password: string | undefined = undefined;

	constructor(private alert: AlertService, private auth: AuthenticationService, private formBuilder: FormBuilder, private http: HttpService, private router: Router) {
		this.form = this.formBuilder.group({
			username: [ '', [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ] ],
			password1: [ '', [ Validators.minLength(8), CustomValidator.whiteSpace ] ],
			password2: [ '', [ Validators.minLength(8), CustomValidator.whiteSpace ] ],
		});
	}

	public ngOnInit(): void {
		this.http.getUser().subscribe(async data => {
			this.user = data?.result;
			this.form.get('username')?.setValue(this.user?.username);

			(await this.alert.showDialog(CheckPasswordComponent, { data: this.user })).afterClosed$.subscribe((result: IDialogResult<string>) => {
				if (result?.button?.value == 'accept') {
					this.password = result.data;
				} else {
					this.router.navigateByUrl(AppURL.HOME);
				}
			});
		});
	}

	public sendForm(): void {
		if (this.form.value.password1 != this.form.value.password2) {
			this.alert.showToast('toast.error.differentPassword', 'error');
			return;
		}

		const username = this.form.value.username;
		const password = this.form.value.password1 || this.password;

		this.http.updateUser(username, password).subscribe(data => {
			if (data?.result) {
				this.alert.showToast('toast.info.saved', 'success');
			} else {
				this.alert.showToast('toast.error.update', 'error');
			}
		});
	}

	public async remove(): Promise<void> {
		const data: IDialogData = {
			title: 'settings.remove.title',
			message: 'settings.remove.message',
			buttons: [
				{ name: 'button.cancel', type: 'secondary', value: 'cancel' },
				{ name: 'button.accept', type: 'primary', value: 'accept' },
			]
		};

		(await this.alert.showDialog(DialogConfirmComponent, { data })).afterClosed$.subscribe((result: IDialogResult<unknown>) => {
			if (result?.button?.value == 'accept') {
				this.http.removeUser().subscribe(data => {
					if (data.result) {
						this.alert.showToast('toast.success.deleteUser', 'success');
						this.auth.removeToken();
					}
				});
			}
		});
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
