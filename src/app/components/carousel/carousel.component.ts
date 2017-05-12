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
max-height

*/

/*

1. Нареждаме всички картинки като елементи в 1 див
2. Подреждат се 1 до друга като безкрайна дължина
3. Със джаваскрипт ако се налага се прави тяхния размер да заема холдъра им
4. Прави се при цъкването прехвърлянето на следващата ( нямаме нужда от автоматизация все още)
5. Правим точките като главен елемент в дива чрез които се управлява и са точния брой на елементите в карусела
6. Прави се автоматизацията
7. Прави се красива анимация която да управлява карусела

*/
export class CarouselComponent {

    @Input()
    slides: Array<Object>;

    @Input()
    height: string = '300px';
    
    private width: string = window.innerWidth + 'px';

    private selectedSlide: number = 0;

    private carouselWholeWidth: number = window.innerWidth;

    constructor(
        private router: Router
    ) {}

    ngOnChanges(changes: any) {
        if(changes.slides !== undefined) {
            this.calculateWidth();
        }
    }
    
    private openLink(product) {
        this.router.navigate(['/details/' + product.link]);
    }

    private selectSlide(index) {

    }

    private moveToSlide() {

    }

    private next() {
        this.selectedSlide++;
        this.moveToSlide();
    }

    private previous() {
        this.selectedSlide--;
        this.moveToSlide();
    }

    private calculateWidth() {
        this.carouselWholeWidth = parseInt(this.width) * this.slides.length;
    }
}
