import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export enum Locale {
	english = 'en',
	spanish = 'es'
}

@Injectable({ providedIn: 'root' })
export class TranslationService {

	constructor(@Inject(DOCUMENT) private _document: Document, private _translate: TranslateService) {
		this.useLanguage(this._translate.getBrowserLang());
	}

	public get(key: string): Promise<string> {
		return new Promise<string>(resolve => {
			this._translate.stream(key).subscribe(data => resolve(data));
		});
	}

	public useLanguage(language?: string): void {
		language = this.availableLanguages().find(item => item == language) || Locale.english;

		this._document.documentElement.lang = language;
		this._translate.use(language);
	}

	public availableLanguages(): string[] {
		return Object.values(Locale);
	}

}
