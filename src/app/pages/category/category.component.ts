import { Component, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductsService } from '../../services/products/products.service';
import { CategoriesService } from '../../services/categories/categories.service';

import { EventBusService } from '../../core/event-bus/event-bus.service';

import { ProductModel } from '../../services/products/product.model';
import { CategoryModel } from '../../services/categories/category.model';

@Component({
    selector: 'category',
    styleUrls: ['./category.component.scss'],
    templateUrl: './category.component.html'
})

export class CategoryComponent {

    public category: CategoryModel;
    public products: ProductModel[];

    public categoryLink: string;

    constructor(
        private router: Router,
        private routeParams: ActivatedRoute,
        private productsService: ProductsService,
        private eventBusService: EventBusService,
        private categoriesService: CategoriesService
    ) {
        this.routeParams.params.subscribe(params => this.setParams(params));
    };
    
    private setParams(params) {
        if(params['category']) {
            let category = params.category.toLowerCase();
            this.category = this.categoriesService.getCategoryByLink(category);
            if(!this.category) {
                this.categoryLink = category;
                this.eventBusService.productsUpdate.subscribe(() => this.onFetchedData());
                this.eventBusService.categoriesUpdate.subscribe(() => this.onFetchedData());
                return;
            }
            this.products = this.productsService.getProductsByCategory(this.category['products']);
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
