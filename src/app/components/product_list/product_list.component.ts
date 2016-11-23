import { Component, Input, Output } from '@angular/core';
import { Dictionary } from '../../dictionary/dictionary.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';
import { EventEmiterService } from '../../services/event.emiter.service';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'product-list',
    styleUrls: ['./product_list.component.css'],
    templateUrl: './product_list.component.html'
})

export class ProductListComponent {
    @Input()
    products: Array<Object> = [];

    @Input()
    category: Object = {};

    private categoryLink: String;

    /**
     * @constructor on init
     */
    public constructor(
        private dictionary: Dictionary,
        private routeParams: ActivatedRoute,
        private productsService: ProductsService,
        private categoriesService: CategoriesService,
        private eventEmiterService: EventEmiterService
    ) {
        this.routeParams.params.subscribe(params => this.setParams(params));
    }

    private setParams(params) {
        if(params['category']) {
            this.category = this.categoriesService.getCategoryByLink(params['category']);
            if(this.category == undefined) {
                this.category = {};
                this.products = [];
                this.categoryLink = params['category'];
                this.eventEmiterService.dataFetched.subscribe(data => this.onFetchedData(data));
                return;
            }
            this.products = this.productsService.getProductsByCategory(this.category['products']);
        }
    }

    private onFetchedData(data) {
      this.category = this.categoriesService.getCategoryByLink(this.categoryLink);
      this.products = this.productsService.getProductsByCategory(this.category['products']);
    }
}
