import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { EventBusService } from '../../core/event-bus/event-bus.service';

const sharredOptions = {
	header: true,
	footer: true
};

@Component({
    selector: 'category',
    styleUrls: ['./category.component.scss'],
    templateUrl: './category.component.html'
})

export class CategoryComponent {

    constructor(
        private router: Router,
        private eventBusService: EventBusService
    ) {
        this.eventBusService.emitChangeSharedOptions(sharredOptions);
    };
}
