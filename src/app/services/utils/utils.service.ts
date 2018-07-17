import { Injectable } from '@angular/core';

import { ProductModel } from '../../models/product.model';
import { CartProductModel } from '../../models/cart-product.model';

@Injectable()

/**
 * @DriverService used on all connections to the back-end for the drivers
 */
export class UtilsService {

    constructor() { }

    public cloneObject(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    public cartToLocalstorageModel(product: CartProductModel) {
        return {
            id: product.id,
            amount: product.amount || 1
        }
    }

    public objectToArray(obj) {
        return Object.keys(obj).map(function(key) {
            return obj[key];
        });
    }
}
