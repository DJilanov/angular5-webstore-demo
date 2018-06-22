import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TranslateDirective } from './translation/directives/translate.directive';
import { TranslateService } from './translation/services/translate.service';

import { StepsComponent } from './steps/steps.component';
import { HeaderComponent } from './header/header.component';
import { ProductComponent } from './product/product.component';
import { CarouselComponent } from './carousel/carousel.component';

import { throwIfAlreadyLoaded } from '../core/module-import-guard';

@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    exports: [
        StepsComponent,
        HeaderComponent,
        ProductComponent,
        CarouselComponent,
        TranslateDirective
    ],
    declarations: [
        StepsComponent,
        HeaderComponent,
        ProductComponent,
        CarouselComponent,
        TranslateDirective
    ],
    providers: [
        TranslateService
    ]
})
export class SharedModule { }