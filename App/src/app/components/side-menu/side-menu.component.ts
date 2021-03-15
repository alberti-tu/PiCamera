import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { DialogData } from '../dialog/dialog.component';

export interface MenuItem {
	name: string;
	icon: string;
	path: string;
}

@Component({
	selector: 'app-side-menu',
	templateUrl: './side-menu.component.html',
	styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

	@ViewChild('sideMenu') sideMenu: MatSidenav = null;

	@Input() public pages: MenuItem[] = [];
	@Input() public top: number = 0;

	constructor(private _alert: AlertService, private _auth: AuthenticationService, private _router: Router) { }

	public ngOnInit(): void { }

	public navigateTo(url: string): void {
		this.sideMenu.close();

		if (url != null) {
			this._router.navigateByUrl(url);
		} else {
			const options: DialogData = {
				header: 'logout.header',
				message: 'logout.message',
				buttons: [
					{ text: 'logout.button.cancel', value: 'cancel' },
					{ text: 'logout.button.accept', value: 'ok', isPrimary: true }
				]
			};
			this._alert.showDialog(options).subscribe(result => {
				if (result == null || result.button == 'cancel') {
					return;
				}

				this._alert.showToast('toast.info.logout');
				this._auth.removeToken();
			});
		}
	}

	public sideMenuContainer(): any {
		let style: any = { };

		if (this.sideMenu == null || this.sideMenu.opened == false) {
			style = { ...style, 'z-index': '-1' }
		}

		if (this.top > 0) {
			style = { ...style, top: this.top + 'px', height: 'calc(100vh - ' + this.top + 'px)' }
		}

		return style;
	}
}
