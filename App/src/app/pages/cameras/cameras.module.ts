import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared.module";

import { CamerasComponent } from './cameras.component';

const routes: Routes = [
	{ path: '', component: CamerasComponent }
];

@NgModule({
	declarations: [
		CamerasComponent
	],
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	]
})
export class CamerasModule { }
