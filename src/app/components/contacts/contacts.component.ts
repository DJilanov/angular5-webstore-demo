import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { Dictionary } from '../../dictionary/dictionary.service';
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
        title: this.dictionary.getTexts('contactFormTitle'),
        formFields: [
            {
                label: this.dictionary.getTexts('contactFormYourName'),
                targetName: "name",
                inputType: "text",
                required: true,
                validation: [<any>Validators.required, <any>Validators.maxLength(40)],
                placeholder: this.dictionary.getTexts('contactFormYourNameEnter')
            },
            {
                label: this.dictionary.getTexts('contactFormYourEmail'),
                targetName: "email",
                inputType: "email",
                required: true,
                validation: [<any>Validators.required, <any>Validators.pattern(this.emailValidationRegex)],
                placeholder: this.dictionary.getTexts('contactFormYourEmailEnter')
            },
            {
                label: this.dictionary.getTexts('contactFormYourPhoneNumber'),
                targetName: "phone",
                inputType: "phone",
                required: true,
                validation: [<any>Validators.required, <any>Validators.pattern(this.phoneValidationRegex)],
                placeholder: this.dictionary.getTexts('contactFormYourPhoneNumberEnter')
            },
            {
                label: this.dictionary.getTexts('contactFormYourMessage'),
                targetName: "message",
                inputType: "textarea",
                required: true,
                validation: [<any>Validators.required, <any>Validators.minLength(10)],
                placeholder: this.dictionary.getTexts('contactFormYourMessageEnter')
            }
        ],
        submitBtn: {
            class: "btn btn-default",
            text: this.dictionary.getTexts('contactFormSend')
        },
        captcha: true,
        owner: this
    };

    private onContactFormSubmit(formData) {
        this.fetcherService.sendMessage(formData.value).subscribe(
            response => this.onMessageSend(response, formData),
            err => this.onMessageFail(err)
        );
    }

    private onMessageSend(response, formData) {
        this.messageSuccess = true;
        formData.reset();
    }

    private onMessageFail(err) {
        this.messageFail = true;
        this.errorHandlerService.handleError(err)
    }

    constructor(
        private dictionary: Dictionary,
        private fetcherService: FetcherService,
        private errorHandlerService: ErrorHandlerService
    ) {}
}
