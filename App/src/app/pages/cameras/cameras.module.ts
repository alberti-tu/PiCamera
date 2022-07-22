import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from "src/app/shared.module";

import { CamerasComponent } from './cameras.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
	{ path: '', component: CamerasComponent },
	{ path: ':id', component: DetailComponent }
];

@NgModule({
	declarations: [
		CamerasComponent,
  		DetailComponent
	],
	imports: [
		ComponentsModule,
		SharedModule,
		RouterModule.forChild(routes)
	]
})
export class CamerasModule { }
