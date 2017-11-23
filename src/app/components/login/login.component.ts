import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Dictionary } from '../../dictionary/dictionary.service';
import { FetcherService } from '../../services/fetcher.service';
import { EventEmiterService } from '../../services/event.emiter.service';
import { ErrorHandlerService } from '../../services/error.handler.service';

@Component({
    selector: 'login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html'
})

export class LoginComponent {
    public username: string = '';
    public password: string = '';

    constructor(
		public router: Router,
        public dictionary: Dictionary,
        public authService: AuthService,
        public fetcherService: FetcherService,
        public eventEmiterService: EventEmiterService,
        public errorHandlerService: ErrorHandlerService
    ) {
        let data = this.authService.getLoginData();
        if(data['username']) {
            this.router.navigate(['/home']);
        }
    }

    public tryLogin() {
        this.fetcherService.adminLogin({
            username: this.username,
            password: this.password
        }).subscribe(
            data => this.login(data),
            err => this.errorHandlerService.handleError(err)
        );
    }

    public login(data) {
        this.authService.setLoginData({
            username: this.username,
            password: this.password
        });
        this.eventEmiterService.emitLoggedIn({});
        this.router.navigate(['/home']);
    }
}
