import { Component, Input, Output, ViewChild, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaLoaderService } from 'ng2-recaptcha';
import { FetcherService } from '../../services/fetcher.service';
import { Dictionary } from '../../dictionary/dictionary.service';
import { ErrorHandlerService } from '../../services/error.handler.service';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'contact-form',
    styleUrls: ['./contact-form.component.css'],
    templateUrl: './contact-form.component.html'
})

export class ContactFormComponent implements OnInit {

    private ngForm: FormGroup;

    private captcha: boolean = false;

    private wrongCaptcha: boolean = false;

    private emailValidationRegex: string = '^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';

    private phoneValidationRegex: string = '^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$';

    private messageSuccess: boolean = false;

    private messageFail: boolean = false;

    private formValidations: Array<Object> = [
        {
            field: 'name',
            validation: [<any>Validators.required, <any>Validators.maxLength(40)]
        },
        {
            field: 'email',
            validation: [<any>Validators.required, <any>Validators.pattern(this.emailValidationRegex)]
        },
        {
            field: 'phone',
            validation: [<any>Validators.required, <any>Validators.pattern(this.phoneValidationRegex)]
        },
        {
            field: 'message',
            validation: [<any>Validators.required, <any>Validators.minLength(10)]
        }
    ];
    
    constructor(
        private fetcherService: FetcherService,
        private errorHandlerService: ErrorHandlerService,
        private dictionary: Dictionary
    ) {}

    ngOnInit() {
        let formGroupObject;
        // we set the form controlls that we parsed over each field
        for(let counter = 0; counter < this.formValidations.length; counter++) {
            if(formGroupObject == undefined) {
                formGroupObject = [];
            }
            formGroupObject[this.formValidations[counter]['field']] = new FormControl('', this.formValidations[counter]['validation']);
        }
        this.ngForm = new FormGroup(formGroupObject);
    }

    private resolvedCaptcha(value) {
        if((value !== null) && (value.length > 0)) {
            this.captcha = true;
        } else {
            this.captcha = false;
        }
    }

    private onMessageSend(response, formData) {
        this.messageSuccess = true;
        formData.reset();
    }

    private onMessageFail(err) {
        this.messageFail = true;
        this.errorHandlerService.handleError(err)
    }

    private formSubmit(formData) {
        // we reset the captcha
        if(!this.captcha) {
            this.wrongCaptcha = true;
            return;
        }
        event.preventDefault();
        // we send the request
        this.fetcherService.sendMessage(formData.value).subscribe(
            response => this.onMessageSend(response, formData),
            err => this.onMessageFail(err)
        );
    }
}
