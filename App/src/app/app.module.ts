import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AuthenticationService } from './services/authentication/authentication.service';
import { HttpInterceptorService } from './services/interceptor/http-interceptor.service';
import { HttpService } from './services/http/http.service';
import { TranslationService } from './services/translation/translation.service';

import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { AppURL } from './constants/routes';
import { AlertModule } from './services/alert/components/alert.module';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

const routes: Routes = [
	{ path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
	{ path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
	{ path: 'cameras', canActivate: [AuthenticationService], loadChildren: () => import('./pages/cameras/cameras.module').then(m => m.CamerasModule) },
	{ path: 'home', canActivate: [AuthenticationService], loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
	{ path: 'photos', canActivate: [AuthenticationService], loadChildren: () => import('./pages/photos/photos.module').then(m => m.PhotosModule) },
	{ path: 'settings', canActivate: [AuthenticationService], loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule) },
	{ path: '**', redirectTo: AppURL.HOME, pathMatch: 'full' }
]

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		AlertModule,
		ComponentsModule,
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
        { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
