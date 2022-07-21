import { Injectable } from '@angular/core';
import { TranslationService } from '../translation/translation.service';

@Injectable({ providedIn: 'root' })
export class AlertService {

	constructor(private _translate: TranslationService) { }

	public async showToast(message: string): Promise<void> {
		message = await this._translate.get(message);
	}

}
