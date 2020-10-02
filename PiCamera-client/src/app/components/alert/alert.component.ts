import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface AlertButton {
  name: string;
  value: string;
  isPrimary?: boolean;
}

export interface AlertData {
  header?: string;
  message?: string;
  buttons?: AlertButton[];
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: AlertData, public alert: MatDialogRef<AlertComponent>) { }

  public ngOnInit(): void { }

  public onClick(item: AlertButton): void {
    this.alert.close(item.value);
  }

}
