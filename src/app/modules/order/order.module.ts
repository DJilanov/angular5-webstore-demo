import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { OrderCompleteComponent } from './panels/order-complete/order-complete.component';

import { OrderComponent } from './order.component';

const routes: Routes = [
    { path: '', component: OrderComponent }
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    declarations: [
        OrderComponent,
        OrderCompleteComponent
    ]
})
export class OrderModule { }
