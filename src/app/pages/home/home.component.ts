import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { EventBusService } from '../../core/event-bus/event-bus.service';
import { ProductsService } from '../../services/products/products.service';
import { TranslateService } from '../../shared/translation/services/translate.service';

import { ProductsByCategoriesModel } from './products-by-categories.model';
import { CarouselModel } from '../../components/carousel/carousel.model';

@Component({
    selector: 'home',
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html'
})

export class HomeComponent {

    public language: string;
    public carouselProducts: CarouselModel[];
    
	public productsByCategories: ProductsByCategoriesModel[];

    constructor(
        private router: Router,
        private productsService: ProductsService,
        private eventBusService: EventBusService,
        private translateService: TranslateService,
    ) {
        this.eventBusService.categoriesUpdate.subscribe(() => {
            this.productsByCategories = this.productsService.getMainPageProducts();
            this.carouselProducts = this.productsService.getCarouselProducts();
        });
        this.productsByCategories = this.productsService.getMainPageProducts();
        this.carouselProducts = this.productsService.getCarouselProducts();
        this.language = this.translateService.getLanguage();
    };
}
