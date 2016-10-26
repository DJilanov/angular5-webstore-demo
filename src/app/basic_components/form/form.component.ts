import { Component, Input, Output, ViewChild, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'custom-form',
    styleUrls: ['./form.component.css'],
    templateUrl: './form.component.html'
})

export class FormComponent implements OnInit {
    
    @Input()
    formOptions: Object;

    private ngForm: Object;
    
    constructor() {}

    ngOnInit() {
        var formGroupObject;
        var field;
        for(var counter = 0; counter < this.formOptions['formFields'].length; counter++) {
            field = this.formOptions['formFields'][counter];
            // TODO: FIX IT !!!!
            if(formGroupObject == undefined) {
                formGroupObject = {};
            }
            formGroupObject[field.targetName] = new FormControl('123', [<any>Validators.required, <any>Validators.minLength(5)]);
        }
        this.ngForm = new FormGroup(formGroupObject);
    }
}
