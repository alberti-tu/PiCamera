import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { IFormField } from 'src/app/components/form/form.component';
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

	public fields: IFormField[];
	public form?: Record<string, string | number> = undefined;

	public user?: IUser = undefined;
	public password?: string = undefined;

	constructor(private alert: AlertService, private auth: AuthenticationService, private http: HttpService, private router: Router) {
		this.fields = [
			{
				id: 'username',
				label: 'settings.form.username',
				icon: 'user',
				type: 'text',
				requisites: [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ]
			},
			{
				id: 'password1',
				label: 'settings.form.password-1',
				type: 'password',
				requisites: [ Validators.minLength(8), CustomValidator.whiteSpace ]
			},
			{
				id: 'password2',
				label: 'settings.form.password-2',
				type: 'password',
				requisites: [ Validators.minLength(8), CustomValidator.whiteSpace ]
			}
		];
	}

	public ngOnInit(): void {
		this.http.getUser().subscribe(async data => {
			this.user = data?.result;
			this.fields[0].value = data?.result?.username;

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
				if (result?.data != undefined && result?.button?.value == 'accept') {
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

	public save(): void {
		if (this.form == undefined) {
			return;
		}

		const username = this.form['username'].toString();
		const password1 = this.form['password1'].toString();
		const password2 = this.form['password1'].toString();

		if (password1 != password2) {
			this.alert.showToast('toast.error.differentPassword', 'error');
			return;
		}

		const password = password1 || this.password;

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

}
