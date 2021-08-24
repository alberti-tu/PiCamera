import { Component, OnInit } from '@angular/core';
import { DialogData } from 'src/app/components/dialog/dialog.component';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

	constructor(private _alert: AlertService, private _auth: AuthenticationService, private _http: HttpService) { }

	public ngOnInit(): void {	}

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

			this._http.remove().subscribe(data => {
				if (data.result) {
					this._auth.removeToken();
				}
			});

		});
	}
}
