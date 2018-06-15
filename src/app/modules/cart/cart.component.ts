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
    selector: 'cart',
    styleUrls: ['./cart.component.scss'],
    templateUrl: './cart.component.html'
})

export class CartComponent {

    public cartProducts: CartProductModel[];

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
    }
}
