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

    private blankImage: string = '//s-media-cache-ak0.pinimg.com/236x/dd/57/f6/dd57f6c1ef849ffe61bd073c6d23784e.jpg';
    /**
     * @ngOnInit on init
     */
    public ngOnInit() {

    }
}
