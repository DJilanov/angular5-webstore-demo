import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Dictionary } from '../../dictionary/dictionary.service';

@Component({
    selector: 'price',
    styleUrls: ['./price.component.css'],
    templateUrl: './price.component.html'
})

export class PriceComponent {
    
    @Input()
    public priceOptions;
    
    constructor(
        public dictionary: Dictionary
    ) {}
}
