import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../../services/cart/cart.service';
import { EventBusService } from '../../core/event-bus/event-bus.service';

import { CartProductModel } from '../../models/cart-product.model';

const sharredOptions = {
	header: true,
	footer: true
};

@Component({
    selector: 'app-cart',
    styleUrls: ['./cart.component.scss'],
    templateUrl: './cart.component.html'
})

export class CartComponent {

    public cartProducts: CartProductModel[];
    public totalSum: number = 0;

    constructor(
        private router: Router,
        private cartService: CartService,
        private eventBusService: EventBusService
    ) {
        this.eventBusService.emitChangeSharedOptions(sharredOptions);
        this.updateCartProducts();
        this.eventBusService.cartProductsUpdate.subscribe(() => this.updateCartProducts());

    };

    private updateCartProducts() {
        this.cartProducts = this.cartService.getCartProducts();
        this.cartProducts.map((product) => {
            let price = product.amount * +product.price;
            if(!isNaN(price)) {
                this.totalSum += product.amount * +product.price;
            }
        })
    }

    public removeProduct(product) {
        this.cartService.removeCartProduct(product);
    }
}
