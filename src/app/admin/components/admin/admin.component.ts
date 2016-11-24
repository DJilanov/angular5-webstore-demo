import { Component, Input, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Dictionary } from '../../../dictionary/dictionary.service';
import { FetcherService } from '../../../services/fetcher.service';
import { EventEmiterService } from '../../../services/event.emiter.service';
import { ErrorHandlerService } from '../../../services/error.handler.service';

@Component({
    selector: 'admin',
    styleUrls: ['./admin.component.css'],
    templateUrl: './admin.component.html'
})

export class AdminComponent {
   private adminLoginFormModel: Object = {
        title: this.dictionary.getTexts('loginFormTitle'),
        formFields: [
            {
                label: this.dictionary.getTexts('loginFormUsername'),
                targetName: "username",
                inputType: "text",
                required: true,
                validation: [<any>Validators.required, <any>Validators.maxLength(40)],
                placeholder: this.dictionary.getTexts('loginFormUsernameEnter')
            },
            {
                label: this.dictionary.getTexts('loginFormPassword'),
                targetName: "password",
                inputType: "password",
                required: true,
                validation: [<any>Validators.required, <any>Validators.maxLength(40)],
                placeholder: this.dictionary.getTexts('loginFormPasswordEnter')
            }
        ],
        submitBtn: {
            class: "btn btn-default",
            text: this.dictionary.getTexts('contactFormSend')
        },
        captcha: true,
        owner: this
    };

    private loggedIn: boolean = false;

    constructor(
        private dictionary: Dictionary,
        private authService: AuthService,
        private fetcherService: FetcherService,
        private eventEmiterService: EventEmiterService,
        private errorHandlerService: ErrorHandlerService
    ) {};

    private tryLogin(loginFormData) {
        this.fetcherService.adminLogin(loginFormData.value).subscribe(
            data => this.login(data),
            err => this.errorHandlerService.handleError(err)
        );
    }

    private login(data) {
        this.authService.setLoginData(data);
        this.eventEmiterService.emitLoggedIn({});
        this.loggedIn = true;
    }
}
