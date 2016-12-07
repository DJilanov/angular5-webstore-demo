import { Injectable, EventEmitter } from '@angular/core';

import { Config } from '../config';

@Injectable()

/**
 * @DriverService used on all connections to the back-end for the drivers
 */
export class EventEmiterService {

    public loggedIn: EventEmitter<any>;
    public dataFetched: EventEmitter<any>;
    public changedProduct: EventEmitter<any>;
    public showProductModal: EventEmitter<any>;
    public hideProductModal: EventEmitter<any>;

    constructor() {
        this.loggedIn = new EventEmitter();
        this.dataFetched = new EventEmitter();
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

    // admin

    public emitLoggedIn(loginData) {
        this.loggedIn.emit(loginData);
    }

    public emitShowProductModal(product) {
        this.showProductModal.emit(product);
    }

    public emitHideProductModal(empty) {
        this.hideProductModal.emit(empty);
    }
}
