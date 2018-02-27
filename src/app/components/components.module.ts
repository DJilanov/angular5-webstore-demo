import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


import { ProductComponent } from './product/product.component';
import { CarouselComponent } from './carousel/carousel.component';
import { OrderPanelComponent } from './order-panel/order-panel.component';

import { throwIfAlreadyLoaded } from '../core/module-import-guard';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
		SharedModule
    ],
    exports: [
        ProductComponent,
        CarouselComponent,
        OrderPanelComponent
    ],
    declarations: [
        ProductComponent,
        CarouselComponent,
        OrderPanelComponent
    ]
})
export class ComponentsModule {
	constructor( @Optional() @SkipSelf() parentModule: CommonModule) {
		throwIfAlreadyLoaded(parentModule, 'ComponentsModule');
	}
}