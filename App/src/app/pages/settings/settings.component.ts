import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { AppURL } from 'src/app/constants/routes';
import { CustomValidator } from 'src/app/global/utils';
import { IDialogData, IDialogResult } from 'src/app/models/global';
import { IUser } from 'src/app/models/http.models';
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

			const dialog: IDialogData = {
				title: 'settings.dialog.title',
				form: [
					{
						id: 'password',
						label: 'settings.form.password',
						type: 'password',
						requisites: [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ]
					}
				],
				buttons: [
					{ name: 'button.cancel', type: 'secondary', value: 'cancel' },
					{ name: 'button.accept', type: 'primary', value: 'accept' },
				]
			};
	
			(await this.alert.showDialog(DialogComponent, { data: dialog })).afterClosed$.subscribe((result: IDialogResult<Record<string, string>>) => {
				if (result.data != undefined && result?.button?.value == 'accept') {
					if (this.user?.password == this.auth.hash(result.data['password'])) {
						this.password = result.data['password'];
					} else {
						this.alert.showToast('toast.error.confirmPassword', 'error');
						this.ngOnInit();
					}
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
		const dialog: IDialogData = {
			title: 'settings.remove.title',
			message: 'settings.remove.message',
			buttons: [
				{ name: 'button.cancel', type: 'secondary', value: 'cancel' },
				{ name: 'button.accept', type: 'primary', value: 'accept' },
			]
		};

		(await this.alert.showDialog(DialogComponent, { data: dialog })).afterClosed$.subscribe((result: IDialogResult<unknown>) => {
			if (result?.button?.value == 'accept') {
				this.http.removeUser().subscribe(data => {
					if (data?.result) {
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
