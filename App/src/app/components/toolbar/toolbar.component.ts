import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

	public header: string = '';
	public pages: MenuItem[] = environment.pages;

	constructor(private alert: AlertService, private auth: AuthenticationService, private router : Router) {
		const page = environment.pages.find(item => item.link?.includes(this.router.url));
		this.header = page?.name || 'PiCamera';
	}

	public logout(): void {
		this.alert.showToast('toast.info.logout', 'info');
		this.auth.removeToken();
	}

}
