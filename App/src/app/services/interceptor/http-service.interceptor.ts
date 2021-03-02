import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';
import { Message } from 'src/app/models/http.models';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpServiceInterceptor implements HttpInterceptor {

	constructor(private authService: AuthenticationService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		const token = this.authService.getToken();

		if (token != null) {
		  request = request.clone({ setHeaders: { authorization: token } });
		}

		return next.handle(request).pipe(
			tap((response: HttpResponse<Message<any>>) => {
				if (response instanceof HttpResponse && !environment.production) {
					console.log(response.body);
				}
			}),
			catchError((response: HttpResponse<Message<any>>) => {
				if (response instanceof HttpErrorResponse) {
					switch (response.status) {}
				}
				return of(response);
			})
		);
	}

}
