import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { EventBusService } from '../../core/event-bus/event-bus.service';

const sharredOptions = {
	header: true,
	footer: true
};

@Component({
    selector: 'contact',
    styleUrls: ['./contact.component.scss'],
    templateUrl: './contact.component.html'
})

export class ContactComponent {

    constructor(
        private router: Router,
        private eventBusService: EventBusService
    ) {
        this.eventBusService.emitChangeSharedOptions(sharredOptions);
    };
}
