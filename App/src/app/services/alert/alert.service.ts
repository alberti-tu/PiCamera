import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast, ToastSettings } from 'src/app/models/toast.models';

@Injectable({ providedIn: 'root' })
export class AlertService {

	public toast$: BehaviorSubject<Toast> = new BehaviorSubject<Toast>({});

	constructor() {	}

	public showToast(message: string, settings?: ToastSettings) {
		settings = settings || {};
		settings.show = true;
		settings.state = settings.state || 'default';

		const toast: Toast = { id: new Date().getTime(), message, settings };

		this.toast$.next(toast)

		if(settings?.delay && settings.delay > 0) {
			setTimeout(() => this.closeToast(toast), settings.delay);
		}
	}

	public closeToast(item: Toast): void {
		if (item?.settings) {
			item.settings.show = false;
			this.toast$.next(item);
		}
	}

}
