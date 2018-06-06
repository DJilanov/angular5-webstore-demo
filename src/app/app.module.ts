import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ServicesModule } from './services/services.module';
import { FeedbackModule } from './feedback/feedback.module';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,

        CoreModule,
        SharedModule,
        ServicesModule,
        FeedbackModule
	],
	providers: [
		CoreModule,
        SharedModule,
        ServicesModule,
        FeedbackModule
    ],
	bootstrap: [AppComponent]
})
export class AppModule { }
