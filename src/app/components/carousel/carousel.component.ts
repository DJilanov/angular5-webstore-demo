import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'carousel',
  styleUrls: ['./carousel.component.css'],
  templateUrl: './carousel.component.html'
})
/*

options:
Interval
Pause on hover
Bottom dots
Arrows
onclick
custom transition ( by class )
ImageObjects
Object interface = {title, url}

*/
export class CarouselComponent {

    @Input()
    slides: Array<Object> = [
        { "title": "We are covered", "url": "https://raw.githubusercontent.com/christiannwamba/angular2-carousel-component/master/images/covered.jpg" },
        { "title": "Generation Gap", "url": "https://raw.githubusercontent.com/christiannwamba/angular2-carousel-component/master/images/generation.jpg" },
        { "title": "Potter Me", "url": "https://raw.githubusercontent.com/christiannwamba/angular2-carousel-component/master/images/potter.jpg" },
        { "title": "Pre-School Kids", "url": "https://raw.githubusercontent.com/christiannwamba/angular2-carousel-component/master/images/preschool.jpg" },
        { "title": "Young Peter Cech", "url": "https://raw.githubusercontent.com/christiannwamba/angular2-carousel-component/master/images/soccer.jpg" }	
    ];

    private cartProducts: Array<Object> = [];

    constructor(
        private router: Router
    ) {}
    
    private openLink(slide) {
        this.router.navigate(['/details/' + slide.link]);
    }
}
