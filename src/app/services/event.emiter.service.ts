import { Injectable, EventEmitter } from '@angular/core';

import { Config } from '../config';

@Injectable()

/**
 * @DriverService used on all connections to the back-end for the drivers
 */
export class EventEmiterService {

    public dataFetched: EventEmitter<any>;
    public showProductModal: EventEmitter<any>;
    public hideProductModal: EventEmitter<any>;

    constructor() {
        this.dataFetched = new EventEmitter();
        this.showProductModal = new EventEmitter();
        this.hideProductModal = new EventEmitter();
    }

    public emitFetchedData(data) {
        this.dataFetched.emit(data);
    }

    public emitShowProductModal(data) {
        this.showProductModal.emit(data);
    }

    public emitHideProductModal(data) {
        this.hideProductModal.emit(data);
    }
}
