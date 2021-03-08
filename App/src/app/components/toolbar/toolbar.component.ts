import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MenuItem } from '../side-menu/side-menu.component';

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, AfterViewInit {

	@ViewChild('toolbar') toolbar: MatToolbar;

	public height: number = 0;

	public pages: MenuItem[] = [
		{ name: 'menu.home', icon: 'home.svg', path: 'home' },
		{ name: 'menu.photos', icon: 'file.svg', path: null },
		{ name: 'menu.subscriptions', icon: 'camera.svg', path: null },
		{ name: 'menu.settings', icon: 'settings.svg', path: null },
		{ name: 'menu.logout', icon: 'logout.svg', path: null },
	];

	constructor() { }

	public ngOnInit(): void { }

	public ngAfterViewInit() {
		setTimeout(() => this.height = this.toolbar._elementRef.nativeElement.offsetHeight);
	}
}
