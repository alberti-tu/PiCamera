import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { LogoutComponent } from './dialogs/logout/logout.component';

@NgModule({
	declarations: [
		LogoutComponent,
		SideMenuComponent,
		ToolbarComponent,
	],
	exports: [
		LogoutComponent,
		SideMenuComponent,
		ToolbarComponent,
	],
	imports: [SharedModule]
})
export class ComponentsModule { }
