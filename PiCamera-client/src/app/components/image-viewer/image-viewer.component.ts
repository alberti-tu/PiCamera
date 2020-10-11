import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string, public alert: MatDialogRef<ImageViewerComponent>) { }

  public ngOnInit(): void { }

}
