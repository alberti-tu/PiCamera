import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

import { BackdropComponent } from './backdrop/backdrop.component';
import { ToastComponent } from './toast/toast.component';

@NgModule({
	declarations: [
		BackdropComponent,
		ToastComponent,
	],
	exports: [
		BackdropComponent,
		ToastComponent,
	],
	imports: [SharedModule]
})
export class AlertModule { }
