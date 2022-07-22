import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from "src/app/shared.module";

import { RegisterComponent } from './register.component';

const routes: Routes = [
	{ path: '', component: RegisterComponent }
];

@NgModule({
	declarations: [
		RegisterComponent
	],
	imports: [
		ComponentsModule,
		SharedModule,
		RouterModule.forChild(routes)
	]
})
export class RegisterModule { }
