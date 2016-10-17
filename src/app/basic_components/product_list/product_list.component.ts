import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Language } from '../../language/language.service';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'product-list',
    styleUrls: ['./product_list.component.css'],
    templateUrl: './product_list.component.html'
})

export class ProductListComponent {
    @Input()
    products: Array<Object>;

    @Input()
    category: Array<Object>;

    /**
     * @constructor on init
     */
    public constructor(
        private language: Language
    ) {}
}
