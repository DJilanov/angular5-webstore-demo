import { Injectable } from '@angular/core';

import { UserModel } from './user.model';

import { EventBusService } from '../../core/event-bus/event-bus.service';

@Injectable()

/**
 * @DriverService used on all connections to the back-end for the drivers
 */
export class AuthService {

    private userData: UserModel = new UserModel();

    constructor(
        private eventBusService: EventBusService
    ) {
        this.eventBusService.loggedIn.subscribe((userData) => this.setLoginData(userData));
    }

    public setLoginData(userData: UserModel) {
        this.userData = userData;
    }

    public getLoginData() {
        return this.userData;
    }
}
