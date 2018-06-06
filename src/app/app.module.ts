import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { ReCaptchaModule } from 'angular2-recaptcha';

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
		FormsModule,
		HttpModule,
		ReCaptchaModule,

		AgmCoreModule.forRoot({
		  apiKey: 'AIzaSyDJ7JbwKivO6_50DDkipCoxkgtcURyelr8'
		}),

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
