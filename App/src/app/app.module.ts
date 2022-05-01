import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AuthenticationService } from './services/authentication/authentication.service';
import { HttpInterceptorService } from './services/interceptor/http-interceptor.service';
import { HttpService } from './services/http/http.service';
import { TranslationService } from './services/translation/translation.service';

import { AppComponent } from './app.component';

import { AppURL } from './constants/routes';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

const routes: Routes = [
	{ path: '**', redirectTo: AppURL.home, pathMatch: 'full' }
]

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes),
		TranslateModule.forRoot({
			loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] }
		})
	],
	providers: [
		HttpService,
        TranslationService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
