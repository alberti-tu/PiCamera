import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent, AlertData } from 'src/app/components/alert/alert.component';
import { ImageViewerComponent } from 'src/app/components/image-viewer/image-viewer.component';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdviceService {

  constructor(private toast: MatSnackBar, private dialog: MatDialog) { }

  public openImageViewer(data: string): Observable<string> {
    return this.dialog.open(ImageViewerComponent, { data, maxWidth: '100%' }).afterClosed();
  }

  public showAlert(data: AlertData): Observable<string> {
    return this.dialog.open(AlertComponent, { data, autoFocus: false }).afterClosed();
  }

  public showToast(message: string, action?: string, config?: MatSnackBarConfig<any>): MatSnackBarRef<SimpleSnackBar> {
    if (action != null) {
      config = config != null ? config : { verticalPosition: 'top', horizontalPosition: 'right' };
    } else {
      config = config != null ? config : { duration: 3000, verticalPosition: 'top', horizontalPosition: 'right' };
    }
    return this.toast.open(message, action, config);
  }

}
