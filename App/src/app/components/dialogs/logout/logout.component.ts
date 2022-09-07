import { Component } from '@angular/core';
import { Data } from '@angular/router';
import { DialogRef } from '@ngneat/dialog';
import { IButton } from 'src/app/models/global';

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

	public buttons: IButton[] = [
		{ name: 'button.accept', type: 'secondary', value: 'accept' },
		{ name: 'button.cancel', type: 'primary', value: 'cancel' },
	]

	constructor(private dialog: DialogRef<Data, string>) { }

	public dialogResult(button: IButton): void {
		this.dialog.close(button?.value)
	}

}
