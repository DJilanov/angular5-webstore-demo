import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FetcherService } from './services/fetcher.service';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    private products: Array<Object>;
    private categories: Array<Object>;

    constructor(
        private router: Router,
        private fetcher: FetcherService,
        private productsService: ProductsService,
        private categoriesService: CategoriesService
    ) {
        fetcher.getProducts().subscribe(
            data => this.setProducts(data),
            err => this.handleError(err)
        );
        fetcher.getCategories().subscribe(
            data => this.setCategories(data),
            err => this.handleError(err)
        );
    };

    private setProducts(result) {
        this.products = result.json();
        this.productsService.setProducts(this.products);
    }

    private setCategories(result) {
        this.categories = result.json();
        this.categoriesService.setCategories(this.categories);
    }

    private handleError(err) {
        console.log(err);
    }

    public ngOnInit() {}
}
