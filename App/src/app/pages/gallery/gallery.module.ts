import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared.module";
import { GalleryComponent } from './gallery.component';
import { DetailComponent } from './detail/detail.component';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
	{ path: '', component: GalleryComponent },
	{ path: ':id', component: DetailComponent }
];

@NgModule({
	declarations: [
		GalleryComponent,
		DetailComponent
	],
	imports: [
		ComponentsModule,
		SharedModule,
		RouterModule.forChild(routes)
	]
})
export class GalleryModule { }
