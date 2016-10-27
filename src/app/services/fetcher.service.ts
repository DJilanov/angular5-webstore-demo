import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Config } from '../config';

@Injectable()

/**
 * @DriverService used on all connections to the back-end
 */
export class FetcherService {
    /**
    * @getCategories get all categories
    * @return {Array} categories
    */
    public getCategories() {
        return this.http.get( Config.categoriesUrl );
    }
    /**
    * @getProducts get all products
    * @return {Array} products
    */
    public getProducts() {
        return this.http.get( Config.productsUrl );
    }
    /**
    * @getProducts get products and categories
    * @return {Array} products and categories
    */
    public getProductsAndCategories() {
        return this.http.get( Config.productsAndCategoriesUrl );
    }
    /**
    * @sendMessage send message to the back-end service
    * @return {Object} response of the back-end
    */
    public sendMessage(body) {
        return this.http.post( Config.messageUrl, body );
    }

    constructor( private http: Http ) {}
}
