import { Injectable, EventEmitter } from '@angular/core';

import { Config } from '../config';

@Injectable()

/**
 * @DriverService used on all connections to the back-end for the drivers
 */
export class EventEmiterService {

    public dataFetched: EventEmitter<any>;

    constructor() {
        this.dataFetched = new EventEmitter();
    }

    public emitFetchedData(data) {
        this.dataFetched.emit(data);
    }
}
