import { Component, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Toast } from 'src/app/models/alerts.models';

export type ToastState = 'default' | 'success' | 'warning' | 'danger'

@Component({
	selector: 'toast',
	templateUrl: './toast.component.html',
	styleUrls: ['./toast.component.scss'],
	animations: [
		trigger('toastTrigger', [
			state('open', style({ transform: 'translateY(0%)' })),
			state('close', style({ transform: 'translateY(-200%)' })),
			transition('open <=> close', [animate('500ms ease-in-out')])
		])
	]
})
export class ToastComponent {

	@Input() public data?: Toast;

	constructor() { }

	public close(item?: Toast): void {   
		if (!item) {
			return;
		} 
	}
}
