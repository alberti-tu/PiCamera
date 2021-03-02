import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
	{ path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
	{ path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }
