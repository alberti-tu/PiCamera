import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from '../translation/translation.service';

export type ToastrType = 'info' | 'success' | 'warning' | 'error'

@Injectable({ providedIn: 'root' })
export class AlertService {

	constructor(private _toastr: ToastrService, protected _translation: TranslationService) { }

	public async showToast(message: string, type: ToastrType = 'info') {
		const title = await this._translation.get('toast.state.' + type)
		message = await this._translation.get(message);

		switch (type) {
			case 'success':
				return this._toastr.success(message, title);
			case 'warning':
				return this._toastr.warning(message, title);
			case 'error':
				return this._toastr.error(message, title);
			default:
				return this._toastr.info(message, title);
		}
	}
}
