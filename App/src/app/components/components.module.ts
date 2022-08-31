import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { SideMenuComponent } from './side-menu/side-menu.component';

@NgModule({
	declarations: [
		SideMenuComponent,
		ToolbarComponent
	],
	exports: [
		SideMenuComponent,
		ToolbarComponent
	],
	imports: [SharedModule]
})
export class ComponentsModule { }
