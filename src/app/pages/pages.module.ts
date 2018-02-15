import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DndModule } from 'ng2-dnd';

import { throwIfAlreadyLoaded } from '../core/module-import-guard';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { ProductsComponent } from './products/products.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        DndModule.forRoot()
    ],
    exports: [
        HomeComponent,
        LoginComponent,
        MessagesComponent,
        ProductsComponent,
        NavigationComponent,
        CategoriesComponent,
        ProductEditComponent,
        CategoryEditComponent
    ],
    declarations: [
        HomeComponent,
        LoginComponent,
        MessagesComponent,
        ProductsComponent,
        NavigationComponent,
        CategoriesComponent,
        ProductEditComponent,
        CategoryEditComponent
    ]
})
export class PagesModule {
	constructor( @Optional() @SkipSelf() parentModule: CommonModule) {
		throwIfAlreadyLoaded(parentModule, 'PagesModule');
	}
}