import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HttpService } from './http/http.service';
import { HttpServiceInterceptor } from './interceptor/http-service.interceptor';
import { TranslationService } from './translation/translation.service';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] }
        })
    ],
    exports: [ TranslateModule ],
    providers: [
        HttpService,
        TranslationService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpServiceInterceptor, multi: true }
    ],
})
export class ServicesModule { }