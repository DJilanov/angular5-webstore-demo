import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './categories.component';

import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: CategoriesComponent
    }

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
        CategoriesComponent
    ]
})
export class CategoriesModule { }
