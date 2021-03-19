import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	public form: FormGroup;
	public showPassword1: boolean;
	public showPassword2: boolean;

	constructor(private _alert: AlertService, private _auth: AuthenticationService, private _formBuilder: FormBuilder, private _http: HttpService) { }

	public ngOnInit(): void {
		this.form = this._formBuilder.group({
			username: [ '', Validators.required ],
			password1: [ '', Validators.required ],
			password2: [ '', Validators.required ],
		});
	}

	public async sendForm(): Promise<void> {
		console.log(this.form.value);
	}

	public password1Button(): any {
		this.showPassword1 = !this.showPassword1;
	}

	public password2Button(): any {
		this.showPassword2 = !this.showPassword2;
	}

	public hasError(name: string): string {
		const control = this.form.get(name);
		return control && control.touched && control.errors ? Object.keys(control.errors).join() : null;	
	}

}
