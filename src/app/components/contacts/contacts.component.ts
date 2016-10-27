import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { Language } from '../../language/language.service';
import { FetcherService } from '../../services/fetcher.service';
import { ErrorHandlerService } from '../../services/error.handler.service';

import { Config } from '../../config';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'contacts',
    styleUrls: ['./contacts.component.css'],
    templateUrl: './contacts.component.html'
})

export class ContactsComponent {

    private mapCoordinates = Config.mapCoordinates;

    private emailValidationRegex: string = '^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';

    private phoneValidationRegex: string = '^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$';

    private messageSuccess: boolean = false;

    private messageFail: boolean = false;

    private contactFormModel: Object = {
        title: this.language.getTexts('contactFormTitle'),
        formFields: [
            {
                label: this.language.getTexts('contactFormYourName'),
                targetName: "name",
                inputType: "text",
                required: true,
                validation: [<any>Validators.required, <any>Validators.maxLength(40)],
                placeholder: this.language.getTexts('contactFormYourNameEnter')
            },
            {
                label: this.language.getTexts('contactFormYourEmail'),
                targetName: "email",
                inputType: "email",
                required: true,
                validation: [<any>Validators.required, <any>Validators.pattern(this.emailValidationRegex)],
                placeholder: this.language.getTexts('contactFormYourEmailEnter')
            },
            {
                label: this.language.getTexts('contactFormYourPhoneNumber'),
                targetName: "phone",
                inputType: "phone",
                required: true,
                validation: [<any>Validators.required, <any>Validators.pattern(this.phoneValidationRegex)],
                placeholder: this.language.getTexts('contactFormYourPhoneNumberEnter')
            },
            {
                label: this.language.getTexts('contactFormYourMessage'),
                targetName: "message",
                inputType: "textarea",
                required: true,
                validation: [<any>Validators.required, <any>Validators.minLength(10)],
                placeholder: this.language.getTexts('contactFormYourMessageEnter')
            }
        ],
        submitBtn: {
            class: "btn btn-default",
            text: this.language.getTexts('contactFormSend')
        },
        captcha: true,
        owner: this
    };

    private onContactFormSubmit(formData, self) {debugger;
        self.fetcherService.sendMessage(formData.value).subscribe(
            response => self.onMessageSend(response, formData),
            err => self.errorHandlerService.handleError(err)
        );
    }

    private onMessageSend(response, formData) {
        response = response.json();
        if(response.recieved) {
            this.messageSuccess = true;
            formData.reset();
        } else {
            this.messageFail = true;
        }
    }

    constructor(
        private language: Language,
        private fetcherService: FetcherService,
        private errorHandlerService: ErrorHandlerService
    ) {}
}
