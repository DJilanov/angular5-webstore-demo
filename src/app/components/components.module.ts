import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CarouselComponent } from './carousel/carousel.component';

import { throwIfAlreadyLoaded } from '../core/module-import-guard';

@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    exports: [
        CarouselComponent
    ],
    declarations: [
        CarouselComponent
    ]
})
export class ComponentsModule {
	constructor( @Optional() @SkipSelf() parentModule: CommonModule) {
		throwIfAlreadyLoaded(parentModule, 'ComponentsModule');
	}
}