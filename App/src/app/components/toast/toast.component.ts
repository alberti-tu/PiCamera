import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Toast } from 'src/app/models/alerts.models';

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

	public toast?: Toast;

	constructor(private _alert: AlertService) { }

	public ngOnInit(): void {
		this._alert.getToast().asObservable().subscribe(value => this.toast = value);
	}

	public close(item?: Toast): void {   
		if (!item) {
			return;
		} 

		this._alert.closeToast(item);  
	}

}
