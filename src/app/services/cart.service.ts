import { Injectable, EventEmitter } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';

import { Config } from '../config';

@Injectable()

/**
 * @DriverService used on all connections to the back-end for the drivers
 */
export class CartService {
    // will be used when we have live update of products and everything is dynamic
    public cartUpdate: EventEmitter<any>;
    /**
    * @info: Contains all of the cart items
    */
    private cartArray: Array<Object> = [];

    /**
    * @getCart get all cart items
    * @return {Array} all categoties
    */
    public getCart() {
        return this.cartArray;
    }

    /**
    * @setCart set all cart items
    */
    public setCart(cart) {
        this.cartArray = cart;
        this.cartUpdate.emit(cart);
        this.storage.store('cartProducts', this.cartArray);
    }

    /**
    * @addToCart add item to the cart
    */
    public addToCart(cartItem) {
        this.cartArray.push(cartItem);
        this.cartUpdate.emit(this.cartArray);
        this.storage.store('cartProducts', this.cartArray);
    }

    /**
    * @addToCart add item to the cart
    */
    public emptyCart() {
        this.cartArray.length = 0;
        this.cartUpdate.emit(this.cartArray);
        this.storage.store('cartProducts', this.cartArray);
    }

    constructor(
        private storage: LocalStorageService,
    ) {
        this.cartUpdate = new EventEmitter();
        this.cartArray = this.storage.retrieve('cartProducts') || [];
    }
}
