import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'image',
    styleUrls: ['./image.component.css'],
    templateUrl: './image.component.html'
})

export class ImageComponent implements OnInit {
    
    @Input()
    src: Object;

    @Input()
    alt: Object;

    private blankImage: string = '/img/3bf7019.png';
    /**
     * @ngOnInit on init
     */
    public ngOnInit() {

    }
}
