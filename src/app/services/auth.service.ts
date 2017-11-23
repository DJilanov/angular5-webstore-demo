import { Injectable } from '@angular/core';

import { Config } from '../config';

@Injectable()

/**
 * @DriverService used on all connections to the back-end for the drivers
 */
export class AuthService {

    public userData: Object = {
        username: '',
        password: ''
    };

    constructor() {
        
    }

    public setLoginData(data) {
        this.userData = data;
    }

    public getLoginData() {
        return this.userData;
    }
}
