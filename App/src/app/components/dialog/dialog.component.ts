import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogButton {
	text: string;
	value: string;
	isPrimary?: boolean;
}
  
export interface DialogData {
	header?: string;
	message?: string;
	inputs?: DialogInput[];
	buttons?: DialogButton[];
}

export interface DialogInput {
	text?: string;
	value?: string;
}

export interface DialogResult {
	inputs?: DialogInput[];
	button: string;
}

@Component({
	selector: 'app-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

	constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public alert: MatDialogRef<DialogComponent>) { }

	public ngOnInit(): void { }

	public onClick(item: DialogButton): void {
		const result: DialogResult = { inputs: this.data.inputs, button: item.value };
		this.alert.close(result);
	}

}
