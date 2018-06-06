import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { ProductComponent } from './product.component';

const routes: Routes = [
    { path: '', component: ProductComponent }
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    declarations: [
        ProductComponent
    ]
})
export class ProductModule { }
