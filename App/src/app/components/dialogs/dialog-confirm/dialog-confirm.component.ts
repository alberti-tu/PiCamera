import { Component } from '@angular/core';
import { Data } from '@angular/router';
import { DialogRef } from '@ngneat/dialog';
import { IButton, IDialogData, IDialogResult } from 'src/app/models/global';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent {

	public data: IDialogData | undefined = undefined;

	constructor(private dialog: DialogRef<Data, IDialogResult<unknown>>) {
		this.data = this.dialog.data;
	}

	public dialogResult(button: IButton): void {
		this.dialog.close({ button })
	}
}
