import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

export type ToastrType = 'info' | 'success' | 'warning' | 'error'

@Injectable({ providedIn: 'root' })
export class AlertService {

	constructor(private toastr: ToastrService, private translate: TranslateService) { }

	public async showToast(message: string, type: ToastrType = 'info') {
		const title = await this.getTranslation('toast.state.' + type)
		message = await this.getTranslation(message);

		switch (type) {
			case 'success':
				return this.toastr.success(message, title);
			case 'warning':
				return this.toastr.warning(message, title);
			case 'error':
				return this.toastr.error(message, title);
			default:
				return this.toastr.info(message, title);
		}
	}

	private getTranslation(key: string): Promise<string> {
		return new Promise<string>(resolve => {
			this.translate.stream(key).subscribe(data => resolve(data));
		});
	}
}
