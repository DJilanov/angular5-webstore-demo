import { Injectable, EventEmitter } from '@angular/core';

import { ProductModel } from '../../models/product.model';
import { CarouselModel } from '../../models/carousel.model';
import { CartProductModel } from '../../models/cart-product.model';

import { UtilsService } from '../utils/utils.service';

import { ProductsService } from '../products/products.service';
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
        private productsService: ProductsService,
        private categoriesService: CategoriesService
    ) {
        this.getProductsFromLocalstorage();
    }
    /**
    * @getProducts get all products
    * @return {Array} all products
    */
    public getCartProducts() {
        return this.products;
    }

    public addCartProduct(product: ProductModel) {
        this.products.push(this.productToCartItem(product));
        this.addToLocalstorage();
        this.emitCartProducts();
    }

    public removeCartProduct(product: ProductModel) {
        for(let productCounter = 0; productCounter < this.products.length; productCounter++) {
            if(this.products[productCounter].id === product.id) {
                this.products.splice(productCounter, 1);
                break;
            }
        }
    }

    private productToCartItem(product) {
        return {
            id: product.id,
            mainImage: product.mainImage,
            title: product.title,
            price: product.newPrice,
            amount: 1
        }
    }

    private addToLocalstorage() {
        localStorage.setItem('cart', 
            JSON.stringify(
                this.products.map(
                    (product) => this.utilsService.cartToLocalstorageModel(product)
                )
            )
        );
    }

    private getProductsFromLocalstorage() {
        let localstoageProducts = JSON.parse(localStorage.getItem('cart') || '[]');
        this.products = localstoageProducts.map((product) => {
            return this.productToCartItem(
                this.productsService.getProductById(product.id)
            );
        });
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
