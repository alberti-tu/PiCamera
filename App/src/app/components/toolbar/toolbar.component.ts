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

	constructor(private alert: AlertService, private auth: AuthenticationService) { }

	public logout(): void {
		this.alert.showToast('toast.info.logout', 'success');
		this.auth.removeToken();
	}

}
