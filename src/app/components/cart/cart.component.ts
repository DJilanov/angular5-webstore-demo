import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Dictionary } from '../../dictionary/dictionary.service';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';

@Component({
    selector: 'cart',
    styleUrls: ['./cart.component.css'],
    templateUrl: './cart.component.html'
})

export class CartComponent implements OnInit {

    public cartCategory: Object = {};
    public cartProducts;

    constructor(private storage:LocalStorageService) {}
 
    public ngOnInit() {
        // we save the products in the cart via ID and amount. We later get the products by id
        this.cartProducts = this.storage.retrieve('cartProducts');
    }
}
