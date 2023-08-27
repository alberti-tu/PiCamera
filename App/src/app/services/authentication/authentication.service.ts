import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SHA256, enc } from 'crypto-js';
import { AppURL } from 'src/app/constants/routes';

import { AlertService } from '../alert/alert.service';

const key = 'token';

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements CanActivate {

	constructor(private alert: AlertService, private router: Router) { }

	public canActivate(): boolean {
		if (this.getToken()) {
			return true;
		} else {
			this.removeToken();
			return false;
		}
	}

	public setToken(value: string): void {
		localStorage.setItem(key, value);
	}

	public getToken(): string | null {
		return localStorage.getItem(key);
	}

	public removeToken(isError?: boolean): void {
		if (isError && this.getToken()) {
			this.alert.showToast('toast.error.logout', 'error');
		}
		localStorage.removeItem(key);
		this.router.navigateByUrl(AppURL.LOGIN);
	}

	public hash(value: string): string {
		return SHA256(value).toString(enc.Hex);
	}

}
