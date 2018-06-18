import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptchaComponent } from 'angular2-recaptcha';

import { BackendService } from '../../core/backend/backend.service';
import { EventBusService } from '../../core/event-bus/event-bus.service';

import { ContactModel } from '../../models/contact.model';

import { environment } from 'environments/environment';

@Component({
    selector: 'app-contact',
    styleUrls: ['./contact.component.scss'],
    templateUrl: './contact.component.html'
})

export class ContactComponent {

    @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;

    public phoneNumbers = [ '0878422063', '0878613400' ];
    public lat = environment.mapCoordinates.lat;
    public lng = environment.mapCoordinates.lng;
    public zoom = environment.mapCoordinates.zoom;
    public starsCount = 4.8;

    public formData: ContactModel = new ContactModel();

    public correctCaptcha: boolean = false;

    public messageSuccess: boolean;
    public messageFail: boolean;

    constructor(
        private router: Router,
        private backendService: BackendService,
        private eventBusService: EventBusService
    ) {

    };
    
    ngOnInit() {
		this.eventBusService.emitTranslate({});
    }

    handleCorrectCaptcha() {
        this.correctCaptcha = true;
    }
    
    handleExpireCaptcha() {
        this.correctCaptcha = false;
    }

    submitForm() {
        this.backendService.sendMessage(this.formData).subscribe(
            data => {
                this.messageSuccess = true;
                this.captcha.reset();
            },
            err => this.messageFail = true
        );
    }
}
