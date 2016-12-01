import { Component, Input } from '@angular/core';
import { Dictionary } from '../../dictionary/dictionary.service';
import { EventEmiterService } from '../../services/event.emiter.service';

@Component({
    selector: 'buy-section',
    styleUrls: ['./buy_section.component.css'],
    templateUrl: './buy_section.component.html'
})

export class BuySectionComponent {

    @Input()
    product: Object;

    constructor(private eventEmiterService: EventEmiterService) {

    }
}
