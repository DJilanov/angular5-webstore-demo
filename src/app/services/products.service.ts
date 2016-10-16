import { Injectable } from '@angular/core';

import { Config } from '../config';

@Injectable()

/**
 * @DriverService used on all connections to the back-end for the drivers
 */
export class ProductsService {

    private products
    /**
    * @getProducts get all products
    * @return {Array} all drivers
    */
    public getProducts() {
        return this.http.get( Config.productsUrl ).map( res => res.json() );
    }

    constructor() {}
}
