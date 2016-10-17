import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'product',
    styleUrls: ['./product.component.css'],
    templateUrl: './product.component.html'
})

export class ProductComponent implements OnInit {
    @Input()
    productObject: Object;

    /**
     * @ngOnInit on init
     */
    public ngOnInit() {
        
    }
}
