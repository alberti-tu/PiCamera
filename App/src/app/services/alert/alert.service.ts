import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dialog, DialogButton, DialogSettings, Toast, ToastSettings } from 'src/app/models/alerts.models';

@Injectable({ providedIn: 'root' })
export class AlertService {

	private _dialog: BehaviorSubject<Dialog> = new BehaviorSubject<Dialog>({ id: 0 });
	private _toast: BehaviorSubject<Toast> = new BehaviorSubject<Toast>({ id: 0 });

	constructor() {	}

	public getDialog(): BehaviorSubject<Dialog> {
		return this._dialog;
	}

	public getToast(): BehaviorSubject<Toast> {
		return this._toast;
	}

	public async showDialog(header: string, message: string, buttons: DialogButton[] = [], settings: DialogSettings = {}) {
		await this._dialogControl();

		settings.show = true;

		const dialog: Dialog = { id: new Date().getTime(), header, message, buttons, settings };

		this._dialog.next(dialog);
	}

	public async showToast(message: string, settings: ToastSettings = {}) {
		await this._toastControl();

		settings.show = true;
		settings.state = settings.state || 'default';

		const toast: Toast = { id: new Date().getTime(), message, settings };

		this._toast.next(toast);

		if(settings?.delay && settings.delay > 0) {
			setTimeout(() => this.closeToast(toast), settings.delay);
		}
	}

	public closeDialog(item: Dialog): void {
		if (item?.settings) {
			item.settings.show = false;
			this._toast.next(item);
		}
	}

	public closeToast(item: Toast): void {
		if (item?.settings) {
			item.settings.show = false;
			this._toast.next(item);
		}
	}

	private async _dialogControl(): Promise<void> {
		return new Promise(resolve => {
			this._dialog.asObservable().subscribe(value => {
				if (value.id == 0 || value.settings?.show == false) {
					setTimeout(() => resolve(), 400);
				}
			});
		});
	}

	private async _toastControl(): Promise<void> {
		return new Promise(resolve => {
			this._toast.asObservable().subscribe(value => {
				if (value.id == 0 || value.settings?.show == false) {
					setTimeout(() => resolve(), 400);
				}
			});
		});
	}

}
