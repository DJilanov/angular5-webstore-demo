import { Injectable, EventEmitter } from '@angular/core';

import { Config } from '../config';

@Injectable()

/**
 * @DriverService used on all connections to the back-end for the drivers
 */
export class ErrorHandlerService {

    public errorEmitter: EventEmitter<any>;

    constructor() {
        this.errorEmitter = new EventEmitter();
    }

    public handleError(err) {
        
    }

    public emitError(data) {
        this.errorEmitter.emit(data);
    }
}
