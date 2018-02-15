import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { BackendService } from '../../core/backend/backend.service';
import { EventBusService } from '../../core/event-bus/event-bus.service';
import { ErrorHandlerService } from '../../core/error-handler/error-handler.service';

import { AuthService } from '../../services/auth/auth.service';
import { CategoriesService } from '../../services/categories/categories.service';

const sharredOptions = {
	header: false,
	footer: false
};

@Component({
    selector: 'login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html'
})

export class LoginComponent {
    public username: string = 'toni-website';
    public password: string = 'toni1221';

    public showError: boolean;

    constructor(
		public router: Router,
        public authService: AuthService,
        public backendService: BackendService,
        public eventBusService: EventBusService,
        public errorHandlerService: ErrorHandlerService
    ) {
		this.eventBusService.emitChangeSharedOptions(sharredOptions);
        this.eventBusService.loggedIn.subscribe(() => this.login());
    }

    public tryLogin() {
        this.backendService.adminLogin({
            username: this.username,
            password: this.password
        }).subscribe(
            data => this.eventBusService.emitLoggedIn({
                username: this.username,
                password: this.password
            }),
            err => this.errorHandlerService.handleRequestError(err)
        );
    }

    public rememberMe() {
        // TODO: Implement it. When you log if the token is not expired send it to the back-end to validate it
        document.cookie = "token=User token; expires=Thu, 18 Dec 2013 12:00:00 UTC";
    }

    private login() {
        // this.router.navigate(['/home']);
        this.router.navigate(['/messages']);
    }
}
