import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

import { ToastComponent } from './toast/toast.component';

@NgModule({
	declarations: [
		ToastComponent
	],
	exports: [
		ToastComponent
	],
	imports: [SharedModule]
})
export class ComponentsModule { }
