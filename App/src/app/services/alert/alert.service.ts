import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

export type ToastrType = 'info' | 'success' | 'warning' | 'error'

@Injectable({ providedIn: 'root' })
export class AlertService {

	constructor(private _toastr: ToastrService, private _translate: TranslateService) { }

	public async showToast(message: string, type: ToastrType = 'info') {
		const title = await this._getTranslation('toast.state.' + type)
		message = await this._getTranslation(message);

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

	private _getTranslation(key: string): Promise<string> {
		return new Promise<string>(resolve => {
			this._translate.stream(key).subscribe(data => resolve(data));
		});
	}
}
