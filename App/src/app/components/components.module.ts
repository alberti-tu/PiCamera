import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

import { ToastComponent } from './toast/toast.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
	declarations: [
		ToastComponent,
  		ToolbarComponent
	],
	exports: [
		ToastComponent,
		ToolbarComponent
	],
	imports: [SharedModule]
})
export class ComponentsModule { }
