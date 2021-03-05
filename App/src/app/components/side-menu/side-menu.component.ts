import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
	selector: 'app-side-menu',
	templateUrl: './side-menu.component.html',
	styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

	@ViewChild('sideMenu') sideMenu: MatSidenav;

	public pageList: { name: string, icon: string, action: () => void }[] = [];

	constructor(private _router: Router) { }

	public ngOnInit(): void {
		this.pageList = [
			{ name: 'Inicio', icon: 'home', action: () => this.navigateTo('/home') },
			{ name: 'Álbum', icon: 'folder', action: () => this.navigateTo('/album') },
			{ name: 'Ajustes', icon: 'settings', action: () => this.navigateTo('/settings') }
		];
	}

	public navigateTo(url: string): void {
		this.sideMenu.close();
		this._router.navigateByUrl(url);
	}
}
