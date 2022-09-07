import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { LogoutComponent } from './dialogs/logout/logout.component';
import { CheckPasswordComponent } from './dialogs/check-password/check-password.component';

@NgModule({
	declarations: [
		LogoutComponent,
		SideMenuComponent,
		ToolbarComponent,
  CheckPasswordComponent,
	],
	exports: [
		LogoutComponent,
		SideMenuComponent,
		ToolbarComponent,
	],
	imports: [SharedModule]
})
export class ComponentsModule { }
