import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
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

    private openProduct(slide) {
        this.router.navigate(['/details/' + slide.link]);
    }

    constructor(
        private router: Router,
        private dictionary: Dictionary
    ){}
}
