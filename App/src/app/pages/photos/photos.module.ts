import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared.module";
import { PhotosComponent } from './photos.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
	{ path: '', component: PhotosComponent },
	{ path: ':id', component: DetailComponent }
];

@NgModule({
	declarations: [
		PhotosComponent,
  		DetailComponent
	],
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	]
})
export class PhotosModule { }
