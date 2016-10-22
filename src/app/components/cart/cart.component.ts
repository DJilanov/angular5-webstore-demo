import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Language } from '../../language/language.service';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'cart',
    styleUrls: ['./cart.component.css'],
    templateUrl: './cart.component.html'
})

export class CartComponent implements OnInit {

    private products =  Array<Object>();

    constructor(
        private language: Language,
        private productsService: ProductsService,
        private categoriesService: CategoriesService
    ) {
      this.products = productsService.getProducts();
      // on categories update we update the local array
      this.productsService.productsUpdate.subscribe(products => this.onProductsUpdate(products));
    };

    private onProductsUpdate(products) {
      this.products = products;
    }
    /**
     * @ngOnInit on init
     */
    public ngOnInit() {
        
    }
}
