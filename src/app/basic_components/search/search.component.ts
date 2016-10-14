import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'search',
    styleUrls: ['./search.component.css'],
    templateUrl: './search.component.html'
})

export class SearchComponent implements OnInit {
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
