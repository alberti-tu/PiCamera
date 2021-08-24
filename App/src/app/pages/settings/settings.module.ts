import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ComponentsModule } from "src/app/components/components.module";
import { SharedModule } from "src/app/shared.module";

import { SettingsComponent } from "./settings.component";

const routes: Routes = [
	{ path: '', component: SettingsComponent }
];

@NgModule({
	declarations: [
		SettingsComponent
	],
	imports: [
		ComponentsModule,
		SharedModule,
		RouterModule.forChild(routes)
	]
})
export class SettingsModule { }