import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FetcherService } from '../../services/fetcher.service';
import { Dictionary } from '../../dictionary/dictionary.service';
import { ErrorHandlerService } from '../../services/error.handler.service';
import { EventEmiterService } from '../../services/event.emiter.service';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'contact-form',
    styleUrls: ['./contact-form.component.css'],
    templateUrl: './contact-form.component.html'
})

export class ContactFormComponent implements OnInit {

    @Input()
    type: String;

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
        private eventEmiterService: EventEmiterService,
        private errorHandlerService: ErrorHandlerService,
        private dictionary: Dictionary
    ) {
        this.eventEmiterService.formComplete.subscribe(response => this.onFormComplete(response));
    }

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

    private onMessageSend(response) {
        this.messageSuccess = true;
        this.ngForm.reset();
    }

    private onMessageFail(err) {
        this.messageFail = true;
        this.errorHandlerService.handleError(err)
    }

    private onFormComplete(response) {
        if(response.success) {
            this.onMessageSend(response.response);
        } else {
            this.onMessageFail(response.response);
        }
    }

    private formSubmit(formData) {
        // we reset the captcha
        if(!this.captcha) {
            this.wrongCaptcha = true;
            return;
        }
        event.preventDefault();
        this.eventEmiterService.emitFormSubmit(formData.value, this.type);
    }
}
