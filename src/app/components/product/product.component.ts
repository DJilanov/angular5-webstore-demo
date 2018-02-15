import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { EventBusService } from '../../core/event-bus/event-bus.service';
import { ProductsService } from '../../services/products/products.service';
import { TranslateService } from '../../shared/translation/services/translate.service';

import { ProductModel } from '../../services/products/product.model';

const sharredOptions = {
	header: true,
	footer: true
};

@Component({
    selector: 'carousel',
    styleUrls: ['./carousel.component.scss'],
    templateUrl: './carousel.component.html'
})

export class CarouselComponent {

    public language: string;
    public products: ProductModel[];

    constructor(
        private router: Router,
        private productsService: ProductsService,
        private eventBusService: EventBusService,
        private translateService: TranslateService
    ) {
        
        this.eventBusService.productsUpdate.subscribe(() => {
            this.products = this.productsService.getCarouselProducts();
        });

        this.language = this.translateService.getLanguage();
    };
}
