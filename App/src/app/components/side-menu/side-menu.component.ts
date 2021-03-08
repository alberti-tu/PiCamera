import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

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

	constructor(private _router: Router) { }

	public ngOnInit(): void { }

	public navigateTo(url: string): void {
		this.sideMenu.close();
		this._router.navigateByUrl(url);
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
