import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MenuItem } from '../side-menu/side-menu.component';

@Component({
	selector: 'toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {

	public pages: MenuItem[] = environment.pages;

	constructor() { }

}
