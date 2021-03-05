import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';

import { HttpService } from './services/http/http.service';
import { HttpServiceInterceptor } from './services/interceptor/http-service.interceptor';
import { TranslationService } from './services/translation/translation.service';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

const routes: Routes = [
	{ path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
	{ path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
	{ path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
	declarations: [ AppComponent ],
	bootstrap: [ AppComponent ],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		RouterModule.forRoot(routes),
		TranslateModule.forRoot({
			loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] }
		})
	],
	providers: [
		HttpService,
        TranslationService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpServiceInterceptor, multi: true }
	]
})
export class AppModule { }
