import { Injectable, EventEmitter } from '@angular/core';

import { CartProductModel } from '../../models/cart-product.model';
import { CarouselModel } from '../../models/carousel.model';

import { UtilsService } from '../utils/utils.service';

import { CategoriesService } from '../categories/categories.service';
import { EventBusService } from '../../core/event-bus/event-bus.service';

@Injectable()

/**
 * @DriverService used on all connections to the back-end for the drivers
 */
export class CartService {
    
    private products:CartProductModel[] = [];
    
    constructor(
        private utilsService: UtilsService,
        private eventBusService: EventBusService,
        private categoriesService: CategoriesService
    ) {
        // this.eventBusService.productsUpdate.subscribe((eventData) => this.setProducts(eventData.messages));
    }
    /**
    * @getProducts get all products
    * @return {Array} all products
    */
    public getCartProducts() {
        return this.products;
    }

    public addCartProduct(product: CartProductModel) {
        this.products.push(product);
        this.emitCartProducts();
    }

    public removeCartProduct(product: CartProductModel) {
        for(let productCounter = 0; productCounter < this.products.length; productCounter++) {
            if(this.products[productCounter].id === product.id) {
                this.products.splice(productCounter, 1);
                break;
            }
        }
    }
    
    /**
    * @emitCategories emit the categories to the components
    */
    public emitCartProducts() {
        this.eventBusService.emitCartProductsUpdate({
            products: this.products
        });
    }
}
