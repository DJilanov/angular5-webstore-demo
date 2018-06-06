import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { ReCaptchaModule } from 'angular2-recaptcha';

import { SharedModule } from '../../shared/shared.module';

import { ContactComponent } from './contact.component';

const routes: Routes = [
    { path: '', component: ContactComponent }
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        
		FormsModule,
		ReCaptchaModule,

		AgmCoreModule.forRoot({
		  apiKey: 'AIzaSyDJ7JbwKivO6_50DDkipCoxkgtcURyelr8'
		}),
    ],
    exports: [],
    declarations: [
        ContactComponent
    ]
})
export class ContactModule { }
