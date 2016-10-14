import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Language } from '../../language/language.service';

@Component({
    selector: 'home',
    styleUrls: ['./home.component.css'],
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
    // options of the inner carousel
    public carouselOptions:Object = {
      myInterval: 3000,
      noWrapSlides: false,
      slides: [{
        image: `//placekitten.com/1599/300`,
        text: `test1`
      },{
        image: `//placekitten.com/1598/300`,
        text: `test2`
      },{
        image: `//placekitten.com/1597/300`,
        text: `test3`
      }]
    };


    constructor(
        private language: Language
    ) {};

    private getText(text) {
        return this.language.getTexts(text)
    }
    /**
     * @ngOnInit on init
     */
    public ngOnInit() {
        
    }
}
