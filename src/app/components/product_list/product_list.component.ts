import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Language } from '../../language/language.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'product-list',
    styleUrls: ['./product_list.component.css'],
    templateUrl: './product_list.component.html'
})

export class ProductListComponent {
    @Input()
    products: Array<Object>;

    @Input()
    category: Object;

    private categoryLink: String;

    /**
     * @constructor on init
     */
    public constructor(
        private language: Language,
        private routeParams: ActivatedRoute,
        private productsService: ProductsService,
        private categoriesService: CategoriesService
    ) {
        var self = this;
        this.routeParams.params.subscribe(params => this.setParams(params));
    }

    private setParams(params) {
        if(params['category']) {
            this.category = this.categoriesService.getCategoryByLink(params['category']);
            if(this.category == undefined) {
                this.category = {};
                this.categoryLink = params['category'];
                this.products = [];
                this.productsService.productsUpdate.subscribe(products => this.onProductsUpdate(products));
                this.categoriesService.categoriesUpdate.subscribe(categories => this.onCategoriesUpdate(categories));
                return;
            }
            this.products = this.productsService.getProductsByCategory(this.category['products']);
        }
    }

    private onProductsUpdate(products) {
        // if we doesnt have fetched the categories we cant get the products based on it...
        if((this.categoryLink !== undefined) && (this.category['link'] !== undefined)) {
            this.products = this.productsService.getProductsByCategory(this.category['products']);
        }
    }

    private onCategoriesUpdate(categories) {
        if(this.categoryLink !== undefined) {
            this.category = this.categoriesService.getCategoryByLink(this.categoryLink);
            // if we fetch first the products then categories ( low chanse ) there is problem with the setting
            if((this.products.length == 0) && (this.productsService.getProducts().length > 0)) {
                this.products = this.productsService.getProductsByCategory(this.category['products']);
            }
        }
    }
}
