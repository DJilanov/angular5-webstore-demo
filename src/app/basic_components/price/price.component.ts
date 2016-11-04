import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Language } from '../../language/language.service';

@Component({
    selector: 'price',
    styleUrls: ['./price.component.css'],
    templateUrl: './price.component.html'
})

export class PriceComponent {
    
    @Input()
    priceOptions: Object;
    
    constructor(
        private language: Language
    ) {}
}
