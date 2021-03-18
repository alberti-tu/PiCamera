import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MenuItem } from '../side-menu/side-menu.component';

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, AfterViewInit {

	@ViewChild('toolbar') toolbar: ElementRef;

	@Input() public header: string = null;
	@Input() public back: boolean = false;

	public height: number = 0;

	public pages: MenuItem[] = [
		{ name: 'page.home', icon: 'home.svg', path: 'home' },
		{ name: 'page.cameras', icon: 'camera.svg', path: 'cameras' },
		// { name: 'page.photos', icon: 'picture.svg', path: 'photos' },
		// { name: 'page.settings', icon: 'settings.svg', path: null },
		{ name: 'page.logout', icon: 'logout.svg', path: null },
	];

	constructor(private _location: Location) { }

	public ngOnInit(): void { }

	public ngAfterViewInit(): void {
		setTimeout(() => this.height = this.toolbar.nativeElement.offsetHeight);
	}

	public backButton(): void {
		this._location.back();
	}
}
