import { Component, Input, Output, ViewChild, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaLoaderService } from 'ng2-recaptcha';
import { FetcherService } from '../../services/fetcher.service';
import { Dictionary } from '../../dictionary/dictionary.service';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'custom-form',
    styleUrls: ['./form.component.css'],
    templateUrl: './form.component.html'
})

export class FormComponent implements OnInit {
    @Input()
    formOptions: Object;

    @Input()
    formSubmit: Function;

    private ngForm: FormGroup;

    private captcha: boolean = false;

    private wrongCaptcha: boolean = false;
    
    constructor(
        private fetcherService: FetcherService,
        private dictionary: Dictionary
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
        event.preventDefault();
        this.formSubmit.call(this.formOptions['owner'], formData);
    }

    private resolvedCaptcha(value) {
        if((value !== null) && (value.length > 0)) {
            this.captcha = true;
        } else {
            this.captcha = false;
        }
    }
}
