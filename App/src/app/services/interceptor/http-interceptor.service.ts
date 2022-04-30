import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';
import { Message } from 'src/app/models/http.models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpInterceptorService implements HttpInterceptor {

	constructor(private _auth: AuthenticationService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		const token = this._auth.getToken();

		if (token != null) {
		  request = request.clone({ setHeaders: { authorization: token } });
		}

		return next.handle(request).pipe(
			/*
			tap((response: HttpResponse<Message<any>>) => {
				if (response instanceof HttpResponse && !environment.production) {
					console.log(response.body);
				}
			}),
			*/
			catchError((response: HttpResponse<Message<any>>) => {
				if (response instanceof HttpErrorResponse) {
					switch (response.status) {
						case 400:
							// this._alert.showToast('toast.error.badRequest');
							break;
						case 401:
							// this._alert.showToast('toast.error.logout');
							this._auth.removeToken();
							break;
						case 404:
							// this._alert.showToast('toast.error.notFound');
							break;
					}
				}
				return of(response);
			})
		);
	}

}
