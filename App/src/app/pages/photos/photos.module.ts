import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared.module";
import { PhotosComponent } from './photos.component';

const routes: Routes = [
	{ path: '', component: PhotosComponent }
];

@NgModule({
	declarations: [
		PhotosComponent
	],
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	]
})
export class PhotosModule { }
