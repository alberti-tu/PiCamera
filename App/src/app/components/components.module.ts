import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

import { ToastComponent } from './toast/toast.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SideMenuComponent } from './side-menu/side-menu.component';

@NgModule({
	declarations: [
		ToastComponent,
  		ToolbarComponent,
    	SideMenuComponent
	],
	exports: [
		ToastComponent,
		ToolbarComponent,
		SideMenuComponent
	],
	imports: [SharedModule]
})
export class ComponentsModule { }
