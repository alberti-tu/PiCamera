import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IDialogData, IDialogResult } from 'src/app/models/global';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { environment } from 'src/environments/environment';
import { DialogComponent } from '../dialog/dialog.component';
import { MenuItem } from '../side-menu/side-menu.component';

@Component({
	selector: 'toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {

	@Input() public header?: string;

	public pages: MenuItem[] = environment.pages;

	constructor(private alert: AlertService, private auth: AuthenticationService, private router : Router) {
		if (this.header == undefined) {
			const page = environment.pages.find(item => item.link?.includes(this.router.url));
			this.header = page?.name;
		}
	}

	public async logout(): Promise<void> {
		const dialog: IDialogData = {
			title: 'logout.title',
			message: 'logout.message',
			buttons: [
				{ name: 'button.cancel', type: 'secondary', value: 'cancel' },
				{ name: 'button.accept', type: 'primary', value: 'accept' },
			]
		};

		(await this.alert.showDialog(DialogComponent, { data: dialog })).afterClosed$.subscribe((result: IDialogResult<unknown>) => {
			if (result?.button?.value == 'accept') {
				this.alert.showToast('toast.info.logout', 'info');
				this.auth.removeToken();
			}
		});
	}

}
