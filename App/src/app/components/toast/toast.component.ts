import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AlertService } from 'src/app/services/alert/alert.service';

export type ToastState = 'default' | 'success' | 'warning' | 'danger'

@Component({
	selector: 'app-toast',
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
export class ToastComponent implements OnInit {

	constructor(public alert: AlertService) { }

	public ngOnInit(): void {}

	public dismiss(): void {    
		this.alert.closeToast();  
	}

}
