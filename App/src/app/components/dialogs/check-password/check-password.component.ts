import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { DialogRef } from '@ngneat/dialog';
import { AppURL } from 'src/app/constants/routes';
import { CustomValidator } from 'src/app/global/utils';
import { IButton, IDialogResult } from 'src/app/models/global';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
	selector: 'app-check-password',
	templateUrl: './check-password.component.html',
	styleUrls: ['./check-password.component.scss']
})
export class CheckPasswordComponent implements OnInit {

	public form: FormGroup;
	public showPassword: boolean = false;

	public user: any = null;

	public buttons: IButton[] = [
		{ name: 'button.cancel', type: 'secondary', value: 'cancel' },
		{ name: 'button.accept', type: 'primary', value: 'accept' },
	]

	constructor(private alert: AlertService, private auth: AuthenticationService, private dialog: DialogRef<Data, IDialogResult<string>>, private formBuilder: FormBuilder, private http: HttpService, private router: Router) {
		this.form = this.formBuilder.group({
			password: [ '', [ Validators.required, Validators.minLength(8), CustomValidator.whiteSpace ] ]
		});
	}

	public ngOnInit(): void {
		this.http.getUser().subscribe(data => {
			this.user = data?.result;	
		})
	}

	public dialogResult(button: IButton): void {
		if (button.type == 'primary') {
			this.user?.password == this.auth.hash(this.form.value.password) ? this.dialog.close({ button, data: this.form.value.password }) : this.alert.showToast('toast.error.confirmPassword', 'error');
		} else {
			this.dialog.close({ button, data: undefined });
			this.router.navigateByUrl(AppURL.HOME);
		}
	}

	public passwordButton(): void {
		this.showPassword = !this.showPassword;
	}

	public hasError(name: string, error: string): boolean {
		const control = this.form.get(name);
		return control && control.touched && control.errors && control.errors[error];
	}

}
