import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';

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
    /**
    * @sendOrder send order to the back-end service
    * @return {Object} response of the back-end
    */
    public sendOrder(body) {
        return this.http.post( Config.orderUrl, body );
    }


    // ADMIN
    /**
    * @adminLogin send request with login data to the back-end
    * @return {Object} response of the back-end
    */
    public adminLogin(body) {
        return this.http.post( Config.adminLoginUrl, body );
    }
    /**
    * @createProduct send request with new product
    * @return {Object} response of the back-end
    */
    public createProduct(body) {
        let request = Object.assign(body, {'type': 'create'});
        return this.http.post( Config.productsUrl, request );
    }
    /**
    * @updateProduct send request with changed product
    * @return {Object} response of the back-end
    */
    public updateProduct(body) {
        let request = Object.assign(body, {'type': 'update'});
        return this.http.post( Config.productsUrl, request );
    }
    /**
    * @deleteProduct send request with product for deletion
    * @return {Object} response of the back-end
    */
    public deleteProduct(body) {
        let params = new URLSearchParams();
        params.set('username', body.username || "");
        params.set('password', body.password || "");
        params.set('product', JSON.stringify(body.product || ""));
        return this.http.delete( Config.productsUrl, { search: params } );
    }
    /**
    * @createCategories send request with new category
    * @return {Object} response of the back-end
    */
    public createCategories(body) {
        return this.http.post( Config.categoriesUrl, body );
    }
    /**
    * @updateCategories send request with changed categories array
    * @return {Object} response of the back-end
    */
    public updateCategories(body) {
        return this.http.put( Config.categoriesUrl, body );
    }
    /**
    * @deleteCategory send request with category for deletion
    * @return {Object} response of the back-end
    */
    public deleteCategory(body) {
        let params = new URLSearchParams();
        params.set('username', body.username || "");
        params.set('password', body.password || "");
        params.set('category', JSON.stringify(body.category || ""));
        return this.http.delete( Config.categoriesUrl, { search: params } );
    }
    /**
    * @getMessages get all messages
    * @return {Array} messages
    */
    public getMessages(body) {
        let params = new URLSearchParams();
        params.set('username', body.username || "");
        params.set('password', body.password || "");
        return this.http.get( Config.messageUrl, { search: params } );
    }
    /**
    * @deleteMessage send request with message for deletion
    * @return {Object} response of the back-end
    */
    public deleteMessage(body) {
        let params = new URLSearchParams();
        params.set('username', body.username || "");
        params.set('password', body.password || "");
        params.set('message', JSON.stringify(body.message || ""));
        return this.http.delete( Config.messageUrl, { search: params } );
    }

    constructor( public http: Http ) {}
}
