import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IDialogData, IDialogResult } from 'src/app/models/global';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { environment } from 'src/environments/environment';
import { DialogConfirmComponent } from '../dialogs/dialog-confirm/dialog-confirm.component';
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

	public async logout(): Promise<void> {
		const data: IDialogData = {
			title: 'logout.title',
			message: 'logout.message',
			buttons: [
				{ name: 'button.cancel', type: 'secondary', value: 'cancel' },
				{ name: 'button.accept', type: 'primary', value: 'accept' },
			]
		};

		(await this.alert.showDialog(DialogConfirmComponent, { data })).afterClosed$.subscribe((result: IDialogResult<unknown>) => {
			if (result?.button?.value == 'accept') {
				this.alert.showToast('toast.info.logout', 'info');
				this.auth.removeToken();
			}
		});
	}

}
