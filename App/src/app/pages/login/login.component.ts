import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	constructor() { }

	public ngOnInit(): void { }

	public async sendForm(form: { username: string, password: string }): Promise<void> {
		console.log(form);
	}

}
