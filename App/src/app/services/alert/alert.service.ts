import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastState } from 'src/app/components/toast/toast.component';

@Injectable({ providedIn: 'root' })
export class AlertService {

	public toastDisplay$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public toastMessage$: BehaviorSubject<string> = new BehaviorSubject<string>('');
	public toastState$: BehaviorSubject<string> = new BehaviorSubject<string>('');

	constructor() { }

	public async showToast(message: string, state: ToastState = 'default', delay?: number): Promise<void> {
		this.toastState$.next(state);
		this.toastMessage$.next(message);
		this.toastDisplay$.next(true);

		if(delay && delay > 0) {
			setTimeout(() => this.closeToast(), delay);
		}
	}

	public closeToast(): void {
		this.toastDisplay$.next(false);
	}

}
