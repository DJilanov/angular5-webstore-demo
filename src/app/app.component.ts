import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Dictionary } from './dictionary/dictionary.service';
import { FetcherService } from './services/fetcher.service';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';
import { EventEmiterService } from './services/event.emiter.service';
import { ErrorHandlerService } from './services/error.handler.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styles: [ require('./sass/style.scss') ]
})

export class AppComponent {

    public products: Array<Object> = [];
    public categories: Array<Object>;
    public location: string;

    constructor(
        public router: Router,
        public fetcher: FetcherService,
        public dictionary: Dictionary,
        public productsService: ProductsService,
        public categoriesService: CategoriesService,
        public eventEmiterService: EventEmiterService,
        public errorHandlerService: ErrorHandlerService
    ) {
        fetcher.getProductsAndCategories().subscribe(
            data => this.setData(data),
            err => this.errorHandlerService.handleError(err)
        );
    };

    public setData(result) {
        var response = {
            products: [],
            categories: []
        };
        // if it comes from the back-end translate it, else it is cached version
        if(result.json) {
            response = result.json();
        } else {
            response = result;
        }
        
        this.setProducts(response.products);
        this.setCategories(response.categories);
        this.eventEmiterService.emitFetchedData(response);
    }

    public setProducts(result) {
        this.products = result;
        this.productsService.setProducts(this.products);
    }

    public setCategories(result) {
        this.categories = result;
        this.categoriesService.setCategories(this.categories);

    }
}
