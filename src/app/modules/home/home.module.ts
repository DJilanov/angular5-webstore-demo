import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';

import { SharedModule } from '../../shared/shared.module';

import { throwIfAlreadyLoaded } from '../../core/module-import-guard';

const routes: Routes = [
    { path: '', component: HomeComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        SharedModule
    ],
    exports: [

    ],
    declarations: [
        HomeComponent
    ]
})
export class HomeModule { }
