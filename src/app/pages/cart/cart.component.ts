import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { EventBusService } from '../../core/event-bus/event-bus.service';

const sharredOptions = {
	header: true,
	footer: true
};

@Component({
    selector: 'cart',
    styleUrls: ['./cart.component.scss'],
    templateUrl: './cart.component.html'
})

export class CartComponent {

    constructor(
        private router: Router,
        private eventBusService: EventBusService
    ) {
        this.eventBusService.emitChangeSharedOptions(sharredOptions);
    };
}
