import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogButton {
	name: string;
	value: string;
	isPrimary?: boolean;
}
  
export interface DialogData {
	header?: string;
	message?: string;
	buttons?: DialogButton[];
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
		this.alert.close(item.value);
	}

}
