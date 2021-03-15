import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { DialogComponent, DialogData, DialogResult } from 'src/app/components/dialog/dialog.component';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {

	constructor(private _dialog: MatDialog, private _toast: MatSnackBar, private _translate: TranslateService) { }

	public showDialog(data: DialogData): Observable<DialogResult> {
		return this._dialog.open(DialogComponent, { data, autoFocus: false }).afterClosed();
	}

	public async showToast(message: string, action?: string, config?: MatSnackBarConfig<any>): Promise<MatSnackBarRef<SimpleSnackBar>> {
		message = await this.translate(message);
		if (action != null) {
			config = config != null ? config : { horizontalPosition: 'right', verticalPosition: 'bottom' };
		} else {
			config = config != null ? config : { duration: 3000, horizontalPosition: 'right', verticalPosition: 'bottom' };
		}
		return this._toast.open(message, action, config);
	}

	private translate(key: string): Promise<string> {
		return new Promise<string>(resolve => {
			this._translate.stream(key).subscribe(data => resolve(data));
		});
	}

}
