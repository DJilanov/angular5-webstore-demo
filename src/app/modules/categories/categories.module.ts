import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { CategoriesComponent } from './categories.component';

const routes: Routes = [
    { path: '', component: CategoriesComponent }
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    declarations: [
        CategoriesComponent
    ]
})
export class CategoriesModule { }
