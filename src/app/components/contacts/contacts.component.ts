import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { Dictionary } from '../../dictionary/dictionary.service';
import { FetcherService } from '../../services/fetcher.service';
import { EventEmiterService } from '../../services/event.emiter.service';

import { Config } from '../../config';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'contacts',
    styleUrls: ['./contacts.component.css'],
    templateUrl: './contacts.component.html'
})

export class ContactsComponent {

    public mapCoordinates = Config.mapCoordinates;
    public starsCount: number = 4.6;
    public messageFail: boolean = true;
    public messageSuccess: boolean = true;

    constructor(
        public dictionary: Dictionary,
        public fetcherService: FetcherService,
        public eventEmiterService: EventEmiterService
    ) {
        this.eventEmiterService.formSubmit.subscribe(data => this.onContactFormSubmit(data));
    }

    public onMessageSend(response) {
        this.eventEmiterService.emitFormComplete(response, true);
    }

    public onMessageFail(err) {
        this.eventEmiterService.emitFormComplete(err, false);
    }

    public onContactFormSubmit(data) {
        if(data.type == 'contact') {
            // send event to the contact module to send the request
            this.fetcherService.sendMessage(data.formData).subscribe(
                response => this.onMessageSend(response),
                err => this.onMessageFail(err)
            );
        }
    }
}
