import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { CheckPasswordComponent } from './dialogs/check-password/check-password.component';
import { DialogConfirmComponent } from './dialogs/dialog-confirm/dialog-confirm.component';

@NgModule({
	declarations: [
		CheckPasswordComponent,
		DialogConfirmComponent,
		SideMenuComponent,
		ToolbarComponent,
	],
	exports: [
		CheckPasswordComponent,
		DialogConfirmComponent,
		SideMenuComponent,
		ToolbarComponent,
	],
	imports: [SharedModule]
})
export class ComponentsModule { }
