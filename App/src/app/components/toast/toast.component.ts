import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

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

	public toastClass: string = 'default';
	public message: string = 'toast.error.login';
	public showToast: boolean = false;

	constructor() { }

	public ngOnInit(): void {
		setTimeout(() => {
			this.showToast = true;
		}, 5000);
	}

}
