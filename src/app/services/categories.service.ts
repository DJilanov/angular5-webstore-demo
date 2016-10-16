import { Injectable } from '@angular/core';
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
        return this.http.get( Config.categoriesUrl ).map( res => res.json() );
    }
    /**
    * @getProducts get all products
    * @return {Array} all drivers
    */
    public getProducts() {
        return this.http.get( Config.productsUrl ).map( res => res.json() );
    }

    constructor( private http: Http ) {}
}
