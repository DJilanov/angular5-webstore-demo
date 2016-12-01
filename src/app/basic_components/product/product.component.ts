import { Component, Input, Output } from '@angular/core';
import { Dictionary } from '../../dictionary/dictionary.service';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'product',
    styleUrls: ['./product.component.css'],
    templateUrl: './product.component.html'
})

export class ProductComponent {
    @Input()
    productObject: Object;

    @Output()
    productImage: Object = {};

    constructor(
        private dictionary: Dictionary
    ){}
}
