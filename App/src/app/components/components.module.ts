import { NgModule } from "@angular/core";
import { DialogComponent } from './dialog/dialog.component';
import { SharedModule } from "../shared.module";
import { SideMenuComponent } from './side-menu/side-menu.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
	declarations: [
		DialogComponent,
		SideMenuComponent,
		ToolbarComponent
	],
	exports: [
		DialogComponent,
		SideMenuComponent,
		ToolbarComponent
	],
	imports: [SharedModule]
})
export class ComponentsModule { }