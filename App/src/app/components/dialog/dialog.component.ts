import { Component, OnInit } from '@angular/core';
import { Dialog } from 'src/app/models/alerts.models';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
	selector: 'app-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

	public dialog?: Dialog;

	constructor(private _alert: AlertService) { }

	public ngOnInit(): void {
		this._alert.getDialog().asObservable().subscribe(value => this.dialog = value);
	}

	public close(item?: Dialog): void {
		if (!item) {
			return;
		} 

		this._alert.closeDialog(item); 
	}
}
