import { Injectable, EventEmitter } from '@angular/core';

import { Config } from '../config';

@Injectable()

/**
 * @DriverService used on all connections to the back-end for the drivers
 */
export class EventEmiterService {

    public loggedIn: EventEmitter<any>;
    public formSubmit: EventEmitter<any>;
    public dataFetched: EventEmitter<any>;
    public formComplete: EventEmitter<any>;
    public changedProduct: EventEmitter<any>;
    public showProductModal: EventEmitter<any>;
    public hideProductModal: EventEmitter<any>;

    constructor() {
        this.loggedIn = new EventEmitter();
        this.formSubmit = new EventEmitter();
        this.dataFetched = new EventEmitter();
        this.formComplete = new EventEmitter();
        this.changedProduct = new EventEmitter();
        this.showProductModal = new EventEmitter();
        this.hideProductModal = new EventEmitter();
    }

    public emitFetchedData(data) {
        this.dataFetched.emit(data);
    }

    public emitChangedProduct(product) {
        this.changedProduct.emit(product);
    }

    public emitFormSubmit(formData, type) {
        this.formSubmit.emit({
            type: type,
            formData: formData
        });
    }

    public emitFormComplete(response, success) {
        this.formComplete.emit({
            success: success,
            response: response
        });
    }
}
