import { Component, Input, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Language } from '../../../language/language.service';
import { FetcherService } from '../../../services/fetcher.service';
import { ErrorHandlerService } from '../../../services/error.handler.service';

@Component({
    selector: 'admin',
    styleUrls: ['./admin.component.css'],
    templateUrl: './admin.component.html'
})

export class AdminComponent {
   private adminLoginFormModel: Object = {
        title: this.language.getTexts('loginFormTitle'),
        formFields: [
            {
                label: this.language.getTexts('loginFormUsername'),
                targetName: "username",
                inputType: "text",
                required: true,
                validation: [<any>Validators.required, <any>Validators.maxLength(40)],
                placeholder: this.language.getTexts('loginFormUsernameEnter')
            },
            {
                label: this.language.getTexts('loginFormPassword'),
                targetName: "password",
                inputType: "password",
                required: true,
                validation: [<any>Validators.required, <any>Validators.maxLength(40)],
                placeholder: this.language.getTexts('loginFormPasswordEnter')
            }
        ],
        submitBtn: {
            class: "btn btn-default",
            text: this.language.getTexts('contactFormSend')
        },
        captcha: true,
        owner: this
    };

    private loggedIn: boolean = false;

    constructor(
        private language: Language,
        private authService: AuthService,
        private fetcherService: FetcherService,
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
        this.loggedIn = true;
    }
}
