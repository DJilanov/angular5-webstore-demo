import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Language } from '../../language/language.service';

import { Config } from '../../config';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'contacts',
    styleUrls: ['./contacts.component.css'],
    templateUrl: './contacts.component.html'
})

export class ContactsComponent {

    private mapCoordinates = Config.mapCoordinates;

    private contactFormModel: Object = {
        title: this.language.getTexts('contactFormTitle'),
        formFields: [
            {
                label: this.language.getTexts('contactFormYourName'),
                targetName: "name",
                inputType: "text",
                required: true,
                placeholder: this.language.getTexts('contactFormYourNameEnter')
            },
            {
                label: this.language.getTexts('contactFormYourEmail'),
                targetName: "email",
                inputType: "email",
                required: true,
                placeholder: this.language.getTexts('contactFormYourEmailEnter')
            },
            {
                label: this.language.getTexts('contactFormYourPhoneNumber'),
                targetName: "phone",
                inputType: "phone",
                required: true,
                placeholder: this.language.getTexts('contactFormYourPhoneNumberEnter')
            },
            {
                label: this.language.getTexts('contactFormYourMessage'),
                targetName: "message",
                inputType: "textarea",
                required: true,
                placeholder: this.language.getTexts('contactFormYourMessageEnter')
            }
        ],
        submitBtn: {
            class: "btn btn-default",
            text: this.language.getTexts('contactFormSend')
        },
        onsubmit: this.onContactFormSubmit
    };

    private onContactFormSubmit(formData) {
        debugger;
    }

    constructor(
        private language: Language
    ) {}
}
