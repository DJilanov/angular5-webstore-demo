import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Language } from '../../language/language.service';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'product',
    styleUrls: ['./product.component.css'],
    templateUrl: './product.component.html'
})

export class ProductComponent implements OnInit {
    @Input()
    productObject: Object;

    @Output()
    productImage: Object = {};

    /**
     * @ngOnInit on init
     */
    public ngOnInit() {
        
    }

    constructor(
        private language: Language
    ){}
}
