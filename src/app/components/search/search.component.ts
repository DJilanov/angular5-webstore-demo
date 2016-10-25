import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Language } from '../../language/language.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'search',
    styleUrls: ['./search.component.css'],
    templateUrl: './search.component.html'
})

export class SearchComponent {
    
    @Input()
    products: Array<Object>;

    constructor(
        private language: Language,
        private routeParams: ActivatedRoute,
        private productsService: ProductsService
    ) {
      this.routeParams.params.subscribe(params => this.setParams(params));
      this.products = productsService.getProducts();
      // on categories update we update the local array
      this.productsService.productsUpdate.subscribe(products => this.onProductsUpdate(products));
    };

    private setParams(params) {
        if(params['query']) {
            debugger;
        }
    }

    private onProductsUpdate(products) {
      this.products = products;
    }
}
