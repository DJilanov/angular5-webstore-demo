import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DndModule } from 'ng2-dnd';

import { throwIfAlreadyLoaded } from '../core/module-import-guard';

import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { CategoryComponent } from './category/category.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

import { ComponentsModule } from '../components/components.module';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        ComponentsModule,
        DndModule.forRoot()
    ],
    exports: [
        HomeComponent,
        CartComponent,
        ContactComponent,
        CategoryComponent,
        ProductDetailsComponent,
    ],
    declarations: [
        HomeComponent,
        CartComponent,
        ContactComponent,
        CategoryComponent,
        ProductDetailsComponent,
    ]
})
export class PagesModule {
	constructor( @Optional() @SkipSelf() parentModule: CommonModule) {
		throwIfAlreadyLoaded(parentModule, 'PagesModule');
	}
}