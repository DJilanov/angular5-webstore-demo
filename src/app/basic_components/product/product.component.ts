import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

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

    constructor(
        private router: Router
    ){}
}
