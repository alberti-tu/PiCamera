import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

import { DialogComponent } from './dialog/dialog.component';
import { FormComponent } from './form/form.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
	declarations: [
		DialogComponent,
		FormComponent,
		SideMenuComponent,
		ToolbarComponent,
	],
	exports: [
		DialogComponent,
		FormComponent,
		SideMenuComponent,
		ToolbarComponent,
	],
	imports: [SharedModule]
})
export class ComponentsModule { }
