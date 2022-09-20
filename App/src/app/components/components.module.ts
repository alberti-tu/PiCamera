import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

import { CheckPasswordComponent } from './dialogs/check-password/check-password.component';
import { DialogComponent } from './dialog/dialog.component';
import { DialogConfirmComponent } from './dialogs/dialog-confirm/dialog-confirm.component';
import { FormComponent } from './form/form.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
	declarations: [
		CheckPasswordComponent,
		DialogComponent,
		DialogConfirmComponent,
		FormComponent,
		SideMenuComponent,
		ToolbarComponent,
	],
	exports: [
		CheckPasswordComponent,
		DialogComponent,
		DialogConfirmComponent,
		FormComponent,
		SideMenuComponent,
		ToolbarComponent,
	],
	imports: [SharedModule]
})
export class ComponentsModule { }
