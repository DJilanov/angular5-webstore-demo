import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../../../../services/cart/cart.service';
import { TranslateService } from '../../../../shared/translation/services/translate.service';

import { ProductModel } from '../../../../models/product.model';

@Component({
    selector: 'app-cart-product',
    styleUrls: ['./cart-product.component.scss'],
    templateUrl: './cart-product.component.html'
})

export class CartProductComponent {

    public language: string;
	@Input() product: ProductModel;
    @Output() removeProduct = new EventEmitter<ProductModel>();

    constructor(
        private router: Router,
        private cartService: CartService,
        private translateService: TranslateService
    ) {
        this.language = this.translateService.getLanguage();
    };

    public remove() {
        this.removeProduct.emit(this.product);
    }
}
