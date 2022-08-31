import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { environment } from 'src/environments/environment';
import { MenuItem } from '../side-menu/side-menu.component';

@Component({
	selector: 'toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {

	public pages: MenuItem[] = environment.pages;

	constructor(private _alert: AlertService, private _auth: AuthenticationService) { }

	public logout(): void {
		const buttons = [
			{ text: 'logout.button.cancel', value: 'cancel' },
			{ text: 'logout.button.accept', value: 'accept', isPrimary: true }
		];
		// this._alert.showDialog('logout.header', 'logout.message', buttons);

		this._auth.removeToken();
	}

}
