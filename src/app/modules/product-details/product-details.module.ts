import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { ProductDetailsComponent } from './product-details.component';

const routes: Routes = [
    { path: '', component: ProductDetailsComponent }
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,

        RouterModule.forChild(routes)
    ],
    exports: [
        
    ],
    declarations: [
        ProductDetailsComponent
    ]
})
export class ProductModule { }
