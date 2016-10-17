import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Config } from '../config';

@Injectable()

/**
 * @DriverService used on all connections to the back-end for the drivers
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
    * @return {Array} all drivers
    */
    public getProducts() {
        return this.http.get( Config.productsUrl );
    }

    constructor( private http: Http ) {}
}
