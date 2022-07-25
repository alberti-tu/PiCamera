import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

import { ToastComponent } from './toast/toast.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
	declarations: [
		DialogComponent,
		SideMenuComponent,
		ToastComponent,
		ToolbarComponent
	],
	exports: [
		DialogComponent,
		SideMenuComponent,
		ToastComponent,
		ToolbarComponent
	],
	imports: [SharedModule]
})
export class ComponentsModule { }
