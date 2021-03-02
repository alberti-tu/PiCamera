import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpServiceInterceptor implements HttpInterceptor {

	constructor() { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			tap((response: HttpResponse<any>) => {
				if (response instanceof HttpResponse && !environment.production) {
					console.log(response.body);
				}
			}),
			catchError((response: HttpResponse<any>) => {
				if (response instanceof HttpErrorResponse) {
					switch (response.status) {}
				}
				return of(response);
			})
		);
	}

}
