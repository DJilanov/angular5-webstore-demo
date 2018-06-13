import { Component, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductsService } from '../../services/products/products.service';
import { CategoriesService } from '../../services/categories/categories.service';

import { EventBusService } from '../../core/event-bus/event-bus.service';
import { TranslateService } from '../../shared/translation/services/translate.service';

import { ProductModel } from '../../models/product.model';
import { CategoryModel } from '../../models/category.model';

@Component({
    selector: 'categories',
    styleUrls: ['./categories.component.scss'],
    templateUrl: './categories.component.html'
})

export class CategoriesComponent {

    public category: CategoryModel;
    public products: ProductModel[];

    public categoryLink: string;
    public language: string;

    constructor(
        private router: Router,
        private productsService: ProductsService,
        private eventBusService: EventBusService,
        private translateService: TranslateService,
        private categoriesService: CategoriesService
    ) {
        let splitted = this.router.url.split('/');
        this.setCategoryData(splitted[splitted.length - 1]);
    };
    
    private setCategoryData(category) {
        if(category) {
            let lowercaseCategory = category.toLowerCase();
            this.language = this.translateService.getLanguage();
            this.category = this.categoriesService.getCategoryByLink(lowercaseCategory);
            if(!this.category) {
                this.categoryLink = lowercaseCategory;
                this.eventBusService.productsUpdate.subscribe(() => this.onFetchedData());
                this.eventBusService.categoriesUpdate.subscribe(() => this.onFetchedData());
                return;
            }
            this.products = this.productsService.getProductsByCategory(this.category['products']);
        } else {
            this.router.navigate(['']);
        }
    }

    private onFetchedData() {
        this.category = this.categoriesService.getCategoryByLink(this.categoryLink);
        if(!this.category) {
            return
        }
        this.products = this.productsService.getProductsByCategory(this.category['products']);
    }

}
