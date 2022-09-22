import { Component } from '@angular/core';
import { Data } from '@angular/router';
import { DialogRef } from '@ngneat/dialog';
import { IFormField } from '../form/form.component';

export interface IDialogData {
	title?: string;
	message?: string;
	form?: IFormField[];
	buttons?: IDialogButton[]
}

export interface IDialogResult<T> {
	button?: IDialogButton;
	data?: T;
}

export interface IDialogButton {
	name?: string;
	type?: 'primary' | 'secondary' | 'default'
	value?: string;
}

@Component({
	selector: 'app-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

	public data?: IDialogData = undefined;
	public form?: Record<string, string | number> = undefined;

	constructor(private dialog: DialogRef<Data, IDialogResult<Record<string, string | number>>>) {
		this.data = this.dialog.data;
	}

	public dialogResult(button: IDialogButton): void {
		if (button.type == 'primary' && (this.data?.form == undefined || this.form != undefined)) {
			this.dialog.close({ button, data: this.form })
		} else if (button.type != 'primary') {
			this.dialog.close({ button })
		}
	}

}
