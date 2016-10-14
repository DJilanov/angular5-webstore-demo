import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'product-list',
    styleUrls: ['./product_list.component.css'],
    templateUrl: './product_list.component.html'
})

export class ProductListComponent implements OnInit {
    @Input()
    postOptions: Object;

    @Output()
    cPayChanged = new EventEmitter();

    private showOverlay = false;

    /**
     * @ngOnInit on init
     */
    public ngOnInit() {

    }
}
