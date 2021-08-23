import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AlertService } from './services/alert/alert.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { HttpService } from './services/http/http.service';
import { HttpServiceInterceptor } from './services/interceptor/http-service.interceptor';
import { TranslationService } from './services/translation/translation.service';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';

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
	{ path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
	declarations: [ AppComponent ],
	bootstrap: [ AppComponent ],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		MatDialogModule,
		MatSnackBarModule,
		RouterModule.forRoot(routes),
		TranslateModule.forRoot({
			loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] }
		})
	],
	providers: [
		AlertService,
		HttpService,
        TranslationService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpServiceInterceptor, multi: true }
	]
})
export class AppModule { }
