import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { OrderPanelComponent } from './panels/order-panel/order-panel.component';
import { ProductDetailsComponent } from './product-details.component';

import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
    { path: '', component: ProductDetailsComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        
        SharedModule,
    ],
    exports: [

    ],
    declarations: [
        OrderPanelComponent,
        ProductDetailsComponent
    ]
})
export class ProductDetailsModule { }
