import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './auth/auth.service';
import { CategoriesService } from './categories/categories.service';
import { MessagesService } from './messages/messages.service';
import { ProductsService } from './products/products.service';
import { UtilsService } from './utils/utils.service';

import { throwIfAlreadyLoaded } from '../core/module-import-guard';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        AuthService,
        CategoriesService,
        MessagesService,
        ProductsService,
        UtilsService
    ],
    exports: []
})
export class ServicesModule {
	constructor( @Optional() @SkipSelf() parentModule: CommonModule) {
		throwIfAlreadyLoaded(parentModule, 'ServiceModule');
	}
}