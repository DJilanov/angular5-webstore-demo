import { Component, Input, Output, ViewChild, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaLoaderService } from 'ng2-recaptcha';
import { FetcherService } from '../../services/fetcher.service';
import { Language } from '../../language/language.service';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'custom-form',
    styleUrls: ['./form.component.css'],
    templateUrl: './form.component.html'
})

export class FormComponent implements OnInit {
    
    /* Example form Options object:

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
        recaptcha: true,
        owner: this

    */
    @Input()
    formOptions: Object;

    @Input()
    formSubmit: Function;

    private ngForm: FormGroup;

    private captcha: boolean = false;

    private wrongCaptcha: boolean = false;
    
    constructor(
        private fetcherService: FetcherService,
        private language: Language
    ) {}

    ngOnInit() {
        var formGroupObject;
        var field;
        // we set the form controlls that we parsed over each field
        for(var counter = 0; counter < this.formOptions['formFields'].length; counter++) {
            field = this.formOptions['formFields'][counter];
            // TODO: FIX IT !!!! there is problem with the defenition ( doesnt have time now.. )
            if(formGroupObject == undefined) {
                formGroupObject = {};
            }
            formGroupObject[field.targetName] = new FormControl('', field.validation);
        }
        this.ngForm = new FormGroup(formGroupObject);
    }

    onSubmit(formData) {
        if((this.formOptions['captcha']) && (!this.captcha)) {
            this.wrongCaptcha = true;
            return;
        }
        this.captcha = false;
        event.preventDefault();
        this.formSubmit.call(this.formOptions['owner'], formData);
    }

    private resolvedCaptcha(value) {
        if(value.length > 0) {
            this.captcha = true;
        }
    }
}
