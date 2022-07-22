import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from "src/app/shared.module";

import { LoginComponent } from './login.component';

const routes: Routes = [
	{ path: '', component: LoginComponent }
];

@NgModule({
	declarations: [
		LoginComponent
	],
	imports: [
		ComponentsModule,
		SharedModule,
		RouterModule.forChild(routes)
	]
})
export class LoginModule { }
