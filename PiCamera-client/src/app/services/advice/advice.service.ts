import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({ providedIn: 'root' })
export class AdviceService {

  constructor(private toast: MatSnackBar, private dialog: MatDialog) { }

  public showToast(message: string, action?: string, config?: MatSnackBarConfig<any>): MatSnackBarRef<SimpleSnackBar> {
    if (action !== undefined) {
      config = config !== undefined ? config : { verticalPosition: 'top', horizontalPosition: 'right' };
    } else {
      config = config !== undefined ? config : { duration: 3000, verticalPosition: 'top', horizontalPosition: 'right' };
    }
    return this.toast.open(message, action, config);
  }

  public showDialog(component: ComponentType<unknown>, options: MatDialogConfig): MatDialogRef<unknown, any> {
    return this.dialog.open(component, options)
  }
}
