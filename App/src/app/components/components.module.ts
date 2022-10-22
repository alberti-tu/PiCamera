import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

import { DialogComponent } from './dialog/dialog.component';
import { FormComponent } from './form/form.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
	declarations: [
		DialogComponent,
		FormComponent,
		PlaceholderComponent,
		SideMenuComponent,
		ToolbarComponent,
	],
	exports: [
		DialogComponent,
		FormComponent,
		PlaceholderComponent,
		SideMenuComponent,
		ToolbarComponent,
	],
	imports: [SharedModule]
})
export class ComponentsModule { }
