import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


import { ProductComponent } from './product/product.component';
import { CarouselComponent } from './carousel/carousel.component';

import { throwIfAlreadyLoaded } from '../core/module-import-guard';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
		SharedModule
    ],
    exports: [
        ProductComponent,
        CarouselComponent
    ],
    declarations: [
        ProductComponent,
        CarouselComponent
    ]
})
export class ComponentsModule {
	constructor( @Optional() @SkipSelf() parentModule: CommonModule) {
		throwIfAlreadyLoaded(parentModule, 'ComponentsModule');
	}
}