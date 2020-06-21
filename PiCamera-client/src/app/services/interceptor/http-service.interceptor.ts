import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { AdviceService } from 'src/app/services/advice/advice.service';
import { Response } from 'src/app/models/responses'; 

@Injectable()
export class HttpServiceInterceptor implements HttpInterceptor {

  constructor(private adviceService: AdviceService, private authService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Response<any>>> {
    const token = this.authService.getToken();

    if (token !== null) {
      request = request.clone({ setHeaders: { authorization: token } });
    }

    return next.handle(request).pipe(
      tap((response: HttpResponse<Response<any>>) => {
        if (response instanceof HttpResponse) {
          console.log(response.body);
        }
      }),
      catchError((response: HttpResponse<Response<any>>) => {
        if (response instanceof HttpErrorResponse) {
          switch (response.status) {
            case 400:
              this.adviceService.showToast('No se ha podido realizar esa acción, por favor, vuelva a intentarlo'); 
              break;
            case 401: 
              this.authService.removeToken();
              this.adviceService.showToast('La sesión ha expirado, por favor, vuelva a iniciar sesión');
              break;
          }
        }
        return of(response);
      })
    );
  }
}