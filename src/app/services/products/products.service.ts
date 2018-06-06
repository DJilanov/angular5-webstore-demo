import { Injectable, EventEmitter } from '@angular/core';

import { ProductModel } from '../../models/product.model';
import { CarouselModel } from '../../models/carousel.model';

import { UtilsService } from '../utils/utils.service';

import { CategoriesService } from '../categories/categories.service';
import { EventBusService } from '../../core/event-bus/event-bus.service';

@Injectable()

/**
 * @DriverService used on all connections to the back-end for the drivers
 */
export class ProductsService {
    
    private products:ProductModel[] = [];
    
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
    public getProducts() {
        return this.products;
    }

    public setProducts(products: ProductModel[]) {
        this.products = products;
        this.emitProducts();
    }
    
    /**
    * @emitCategories emit the categories to the components
    */
    public emitProducts() {
        this.eventBusService.emitProductsUpdate({
            products: this.products
        });
    }

    public getCarouselProducts() {
        return this.products.filter(product => {
            return product.isOnCarousel && product.isShown;
        }).map(product => {
            return {
                title: product.title,
                link: product.link,
                image: product.mainImage
            }
        });
    }

    public getProductById(id) {
        for(let productsCounter = 0; productsCounter < this.products.length; productsCounter++) {
            if(this.products[productsCounter]['_id'] == id) {
                return this.products[productsCounter];
            }
        }
    }

    public getProductsByCategory(category_id) {
        let productsByCategory = [];
        for(let productsCounter = 0; productsCounter < this.products.length; productsCounter++) {
            if(this.products[productsCounter]['category'] == category_id) {
                productsByCategory.push(this.products[productsCounter]);
            }
        }
        return productsByCategory;
    }

    public getProductByLink(link) {
        for(let productsCounter = 0; productsCounter < this.products.length; productsCounter++) {
            if(this.products[productsCounter]['link'] == link) {
                return this.products[productsCounter];
            }
        }
    }

    public getMainPageProducts() {
        return this.sortProductsByCategories().map((category) => {
            category.products = category.products.filter((product) => {
                return product.isShownMainPage;
            });
            return category;
        })
    }
    
    public sortProductsByCategories() {
        return this.categoriesService.sortCategoriesByZIndex()
            .map((category) => {
                let updatedCategory = this.utilsService.cloneObject(category);
                updatedCategory.products = this.getProductsByCategory(category.products);
                return updatedCategory
            });
    }

    public addProduct(product) {
        this.products.push(product);
    }

    public removeProduct(id) {
        for(let productsCounter = 0; productsCounter < this.products.length; productsCounter++) {
            if(this.products[productsCounter]['_id'] == id) {
                this.products.splice(productsCounter, 1);
            }
        }
    }
}
