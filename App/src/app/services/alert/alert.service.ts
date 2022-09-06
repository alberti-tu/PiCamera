import { Injectable } from '@angular/core';
import { DialogConfig, DialogRef, DialogService } from '@ngneat/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';

export type ToastrType = 'info' | 'success' | 'warning' | 'error'

@Injectable({ providedIn: 'root' })
export class AlertService {

	constructor(private dialog: DialogService, private toastr: ToastrService, private translate: TranslateService) { }

	public async showDialog(component: any, configuration?: Partial<DialogConfig<unknown>>): Promise<DialogRef> {
		return this.dialog.open(component, configuration);
	}

	public async showToast(message: string, type: ToastrType = 'info'): Promise<ActiveToast<any>> {
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
