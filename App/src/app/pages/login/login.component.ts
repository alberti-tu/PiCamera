import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	public form: FormGroup;

	constructor(private _auth: AuthenticationService, private _formBuilder: FormBuilder, private _http: HttpService) { }

	public ngOnInit(): void {
		this.form = this._formBuilder.group({
			username: [ '', Validators.required ],
			password: [ '', Validators.required ]
		});
	}

	public async sendForm(): Promise<void> {
		const username = this.form.value.username;
		const password = this._auth.hash(this.form.value.password);

		this._http.login(username, password).subscribe(data => {
			if (data.result) {
				this._auth.setToken(data.result);
			}
		});
	}

	public hasError(name: string): string {
		const control = this.form.get(name);
		return control && control.touched && control.errors ? Object.keys(control.errors).join() : null;	
	}

}
