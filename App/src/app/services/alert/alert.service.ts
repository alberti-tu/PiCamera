import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast, ToastSettings } from 'src/app/models/toast.models';

@Injectable({ providedIn: 'root' })
export class AlertService {

	private _toast: BehaviorSubject<Toast> = new BehaviorSubject<Toast>({ id: 0 });

	constructor() {	}

	public getToast(): BehaviorSubject<Toast> {
		return this._toast;
	}

	public async showToast(message: string, settings?: ToastSettings) {
		await this._toastControl();

		settings = settings || {};
		settings.show = true;
		settings.state = settings.state || 'default';

		const toast: Toast = { id: new Date().getTime(), message, settings };

		this._toast.next(toast)

		if(settings?.delay && settings.delay > 0) {
			setTimeout(() => this.closeToast(toast), settings.delay);
		}
	}

	public closeToast(item: Toast): void {
		if (item?.settings) {
			item.settings.show = false;
			this._toast.next(item);
		}
	}

	private async _toastControl(): Promise<void> {
		return new Promise(resolve => {
			this._toast.asObservable().subscribe(value => {
				if (value.id == 0 || value.settings?.show == false) {
					setTimeout(() => resolve(), 400)
				}
			});
		});
	}

}
