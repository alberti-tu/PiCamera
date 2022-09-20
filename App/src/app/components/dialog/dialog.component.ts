import { Component } from '@angular/core';
import { Data } from '@angular/router';
import { DialogRef } from '@ngneat/dialog';
import { IButton } from 'src/app/models/global';
import { IFormField } from '../form/form.component';

export interface IDialogData {
	title?: string;
	message?: string;
	form?: IFormField[];
	buttons?: IButton[]
}

export interface IDialogResult<T> {
	button?: IButton;
	data?: T;
}

@Component({
	selector: 'app-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

	public data?: IDialogData = undefined;
	public form?: Record<string, string>;

	constructor(private dialog: DialogRef<Data, IDialogResult<Record<string, string>>>) {
		this.data = this.dialog.data;
		this.form = undefined;
	}

	public dialogResult(button: IButton): void {
		if (this.data?.form == undefined || this.form != undefined) {
			this.dialog.close({ button, data: this.form })
		}
	}

}
