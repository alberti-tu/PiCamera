import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SHA256, enc } from 'crypto-js';

const key = 'token';

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements CanActivate {

	constructor(private router: Router) { }
  
	public canActivate(): boolean {
		if (this.getToken() != null) {
			return true;
		} else {
			this.removeToken();
			return false;
		}
	}

	public saveToken(value: string): void {
		localStorage.setItem(key, value);
		this.router.navigateByUrl('/home');
	}

	public getToken(): string {
		return localStorage.getItem(key);
	}

	public removeToken(): void {
		localStorage.removeItem(key);
		this.router.navigateByUrl('/login');
	}

	public hash(value: string): string {
		return SHA256(value).toString(enc.Hex);
	}

}
