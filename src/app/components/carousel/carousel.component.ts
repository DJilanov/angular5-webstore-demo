import { Component, Input, ViewChild} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'carousel',
  styleUrls: ['./carousel.component.css'],
  templateUrl: './carousel.component.html'
})
/*

# Needed Properties:
 * slides: null(default) | Array[{title: title, image: image}]

 # OptionalProperties:
 
* interval: null(default) | Number
>set auto play interval time
* pauseOnHover: false(default) | true
>should it stop moving on hover
* dots: true(default) | false
>should it show controlling dots
* arrows: true(default) | false
>should it show arrows
* onClick: null(default) | func(index)
>should it has on click on slides
* transition: null(default) | string
>the transition that is used on slide change
* imageStructure: Array[{title: title, image: image}](default) | Array[{slideTitle: title, imageUrl: url }]
>the structure of the slide object
* height: 300px(default) | String
>the height of the carousel
* background: white(default) | String
>background color of the carousel
* htmlTitle: false(default) | true
>used to enable the html based title: "<h1>Hey there</h1><div>what's up?</div>"
* titlePosition: 'top'(default) | 'bottom'
>used to set the position of the header text
* dotsPosition: 'bottom'(default) | 'top'
>used to set the position of the controlling dots

*/
export class CarouselComponent {

    @Input()
    slides: Array<Object>;

    @Input()
    height: string = '300px';

    @Input()
    background: string = 'white';

    @ViewChild('carousel') carousel;
    
    public width: string = window.innerWidth + 'px';

    public selectedSlide: number = 0;

    public carouselWholeWidth: number = window.innerWidth;

    constructor(
        public router: Router
    ) {}

    ngOnChanges(changes: any) {
        if(changes.slides !== undefined) {
            this.calculateWidth();
        }
    }
    
    public openLink(product) {
        this.router.navigate(['/details/' + product.link]);
    }

    public selectSlide(index) {
        this.selectedSlide = index;
        this.moveToSlide();
    }

    public moveToSlide() {
        this.carousel.nativeElement.style.marginLeft = '-' + (this.selectedSlide * window.innerWidth )+ 'px';
    }

    public next() {
        this.selectedSlide++;
        if(this.selectedSlide >= this.slides.length) {
            this.selectedSlide = 0;
        }
        this.moveToSlide();
    }

    public previous() {
        this.selectedSlide--;
        if(this.selectedSlide < 0) {
            this.selectedSlide = this.slides.length - 1;
        }
        this.moveToSlide();
    }

    public calculateWidth() {
        this.carouselWholeWidth = parseInt(this.width) * this.slides.length;
    }
}
