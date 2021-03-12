import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogComponent, DialogData } from 'src/app/components/dialog/dialog.component';

@Injectable({ providedIn: 'root' })
export class AlertService {

	constructor(private dialog: MatDialog) { }

	public showDialog(data: DialogData): Observable<string> {
		return this.dialog.open(DialogComponent, { data, autoFocus: false }).afterClosed();
	}

}
