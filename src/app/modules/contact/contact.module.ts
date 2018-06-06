import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { ContactComponent } from './contact.component';

const routes: Routes = [
    { path: '', component: ContactComponent }
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    declarations: [
        ContactComponent
    ]
})
export class ContactModule { }
