import { Component, Input } from '@angular/core';
import { Dictionary } from '../../dictionary/dictionary.service';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'custom-carousel',
    styleUrls: ['./carousel.component.css'],
    templateUrl: './carousel.component.html'
})

export class CarouselComponent {
    @Input()
    carouselOptions: Object;

    constructor(
        private dictionary: Dictionary
    ){}
}
