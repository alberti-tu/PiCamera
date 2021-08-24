import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ComponentsModule } from "src/app/components/components.module";
import { SharedModule } from "src/app/shared.module";

import { PhotosComponent } from "./photos.component";
import { DetailComponent } from "./detail/detail.component";

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
		ComponentsModule,
		SharedModule,
		RouterModule.forChild(routes)
	]
})
export class PhotosModule { }