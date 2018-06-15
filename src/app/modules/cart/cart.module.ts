import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { CartProductComponent } from './panels/cart-product/cart-product.component';

import { CartComponent } from './cart.component';

const routes: Routes = [
    { path: '', component: CartComponent }
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    declarations: [
        CartComponent,
        CartProductComponent
    ]
})
export class CartModule { }
