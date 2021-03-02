import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ComponentsModule } from './components/components.module';
import { ServicesModule } from './services/services.module';

@NgModule({
	declarations: [ AppComponent ],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		ComponentsModule,
		ServicesModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
