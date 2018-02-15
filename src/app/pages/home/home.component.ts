import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { EventBusService } from '../../core/event-bus/event-bus.service';

const sharredOptions = {
	header: true,
	footer: true
};

@Component({
    selector: 'home',
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html'
})

export class HomeComponent {

    constructor(
        private router: Router,
        private eventBusService: EventBusService
    ) {
        this.eventBusService.emitChangeSharedOptions(sharredOptions);
    };
}
