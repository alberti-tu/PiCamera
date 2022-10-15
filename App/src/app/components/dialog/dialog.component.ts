import { Component } from '@angular/core';
import { Data } from '@angular/router';
import { DialogRef } from '@ngneat/dialog';
import { IFormButton, IFormField, IFormResult } from '../form/form.component';

export interface IDialogData {
	title?: string;
	message?: string;
	form?: IFormField[];
	buttons?: IFormButton[]
}

export interface IDialogResult<T> {
	button?: IFormButton;
	data?: T;
}

@Component({
	selector: 'app-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

	public data?: IDialogData = undefined;

	constructor(private dialog: DialogRef<Data, IDialogResult<Record<string, string | number>>>) {
		this.data = this.dialog.data;
	}

	public dialogResult(result: IFormResult): void {
		if (result?.button?.type == 'submit' && (this.data?.form == undefined || result?.form != undefined)) {
			this.dialog.close({ button: result?.button, data: result?.form })
		} else if (result?.button?.type != 'submit') {
			this.dialog.close({ button: result?.button })
		}
	}

}
