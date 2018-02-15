import { Injectable } from '@angular/core';

@Injectable()

/**
 * @DriverService used on all connections to the back-end for the drivers
 */
export class UtilsService {

    constructor() {}

    public cloneObject(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
}
