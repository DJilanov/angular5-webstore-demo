import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Language } from '../../language/language.service';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';

@Component({
    selector: 'cart',
    styleUrls: ['./cart.component.css'],
    templateUrl: './cart.component.html'
})

export class CartComponent implements OnInit {

    public cartProducts;

    constructor(private storage:LocalStorageService) {}
 
    public ngOnInit() {
        this.cartProducts = this.storage.retrieve('cartProducts');
    }
}
