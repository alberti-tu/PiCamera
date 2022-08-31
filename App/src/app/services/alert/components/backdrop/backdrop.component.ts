import { Component } from '@angular/core';
import { Toast } from 'src/app/models/alerts.models';

@Component({
	selector: 'alert-backdrop',
	templateUrl: './backdrop.component.html',
	styleUrls: ['./backdrop.component.scss']
})
export class BackdropComponent {

	public toasts: Toast[] = []

	constructor() { }

}
