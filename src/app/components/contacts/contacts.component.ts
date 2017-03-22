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

    private mapCoordinates = Config.mapCoordinates;

    constructor(
        private dictionary: Dictionary,
        private fetcherService: FetcherService,
        private eventEmiterService: EventEmiterService
    ) {
        this.eventEmiterService.formSubmit.subscribe(data => this.onContactFormSubmit(data));
    }

    private onMessageSend(response) {
        this.eventEmiterService.emitFormComplete(response, true);
    }

    private onMessageFail(err) {
        this.eventEmiterService.emitFormComplete(err, false);
    }

    private onContactFormSubmit(data) {
        if(data.type == 'contact') {
            // send event to the contact module to send the request
            this.fetcherService.sendMessage(data.formData).subscribe(
                response => this.onMessageSend(response),
                err => this.onMessageFail(err)
            );
        }
    }
}
