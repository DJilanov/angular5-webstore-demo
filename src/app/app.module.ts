import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ServicesModule } from './services/services.module';
import { FeedbackModule } from './feedback/feedback.module';

import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpModule,

		CoreModule,
		SharedModule,
		ServicesModule,
        FeedbackModule,
        
        PagesModule,
        ComponentsModule
	],
	providers: [
		CoreModule,
		SharedModule
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
