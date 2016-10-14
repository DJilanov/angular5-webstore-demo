import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'custom-carousel',
    styleUrls: ['./carousel.component.css'],
    templateUrl: './carousel.component.html'
})

export class CarouselComponent implements OnInit {
    
    @Input()
    carouselOptions: Object;
    /**
     * @ngOnInit on init
     */
    public ngOnInit() {

    }
}
