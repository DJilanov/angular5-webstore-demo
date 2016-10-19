import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import {LocalStorage, SessionStorage} from "angular2-localstorage/WebStorage";
import { Router } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';
import { Language } from '../../language/language.service';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'custom-header',
    styleUrls: ['./header.component.css'],
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

    @LocalStorage() public access_token:String;

    @Output()
    logOutBtnClick = new EventEmitter();

    private products =  Array<Object>();

    private categories = Array<Object>();

    constructor(
        private language: Language,
        private productsService: ProductsService,
        private categoriesService: CategoriesService,
        private router: Router
    ) {
      this.products = productsService.getProducts();
      this.categories = categoriesService.getCategories();
      // on categories update we update the local array
      this.productsService.productsUpdate.subscribe(products => this.onProductsUpdate(products));
      this.categoriesService.categoriesUpdate.subscribe(categories => this.onCategoriesUpdate(categories));
    };

    private onCategoriesUpdate(categories) {
      this.categories = categories;
    }

    private onProductsUpdate(products) {
      this.products = products;
    }

    /**
     * @ngOnInit on init
     */
    public ngOnInit() {
        
    }
}
