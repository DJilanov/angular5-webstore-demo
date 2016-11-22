import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
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

export class AppComponent implements OnInit {

    private products: Array<Object>;
    private categories: Array<Object>;
    private location: string;

    constructor(
        private router: Router,
        private fetcher: FetcherService,
        private productsService: ProductsService,
        private categoriesService: CategoriesService,
        private eventEmiterService: EventEmiterService,
        private errorHandlerService: ErrorHandlerService
    ) {
        fetcher.getProductsAndCategories().subscribe(
            data => this.setData(data),
            err => this.errorHandlerService.handleError(err)
        );
    };

    private setData(result) {
        var response = result.json();
        this.setProducts(response.products);
        this.setCategories(response.categories);
        this.eventEmiterService.emitFetchedData(response);
    }

    private setProducts(result) {
        this.products = result;
        this.productsService.setProducts(this.products);
    }

    private setCategories(result) {
        this.categories = result;
        this.categoriesService.setCategories(this.categories);

    }

    public ngOnInit() {}
}
