import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'product',
    styleUrls: ['./product.component.css'],
    templateUrl: './product.component.html'
})

export class ProductComponent implements OnInit {
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
