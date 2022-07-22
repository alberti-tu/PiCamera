import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
	selector: 'side-menu',
	templateUrl: './side-menu.component.html',
	styleUrls: ['./side-menu.component.scss'],
	animations: [
		trigger('menuTrigger', [
			state('open', style({ transform: 'translateX(0%)' })),
			state('close', style({ transform: 'translateX(-200%)' })),
			transition('open <=> close', [animate('500ms ease-in-out')])
		])
	]
})
export class SideMenuComponent {

	public showMenu: boolean;

	constructor() {
		this.showMenu = false
	}

	public close(event?: MouseEvent): void {
		event?.stopPropagation();
		this.showMenu = false;
	}

	public open(event?: MouseEvent): void {
		event?.stopPropagation();
		this.showMenu = true;
	}

	public toggle(event?: MouseEvent): void {
		event?.stopPropagation();
		this.showMenu = !this.showMenu;
	}

}
