import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';
import { Message } from 'src/app/models/http.models';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alert/alert.service';

@Injectable({ providedIn: 'root' })
export class HttpInterceptorService implements HttpInterceptor {

	constructor(private alert: AlertService, private auth: AuthenticationService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		const token = this.auth.getToken();

		if (token != null) {
		  request = request.clone({ setHeaders: { authorization: token } });
		}

		return next.handle(request).pipe(
			tap(response => {
				if (response instanceof HttpResponse && !environment.production) {
					switch (request?.method) {
						case 'GET':
						case 'DELETE':
							console.log(request?.method, 'Response', response?.body);
							break;
						case 'POST':
						case 'PUT':
							console.log(request?.method, 'Body', request?.body, 'Response', response?.body);
							break;
					}
				}
			}),
			catchError((response: HttpResponse<Message<any>>) => {
				if (response instanceof HttpErrorResponse) {
					switch (response.status) {
						case 401:
							this.alert.showToast('toast.error.logout', 'error');
							this.auth.removeToken();
							break;
						case 404:
							this.alert.showToast('toast.error.notFound', 'error');
							break;
						default:
							this.alert.showToast('toast.error.badRequest', 'error');
					}
				}
				return of(response);
			})
		);
	}

}
