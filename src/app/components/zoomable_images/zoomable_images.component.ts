import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
    selector: 'zoomable-images',
    styleUrls: ['./zoomable_images.component.css'],
    templateUrl: './zoomable_images.component.html'
})

export class ZoomableImagesComponent {
    
    @Input()
    zoomableImages: Array<Object>;

    private imagesArray: Array<Object> = [{
        image: `//placekitten.com/1599/300`,
        text: `test1`
      },{
        image: `//placekitten.com/1598/300`,
        text: `test2`
      },{
        image: `//placekitten.com/1597/300`,
        text: `test3`
      }];
    
    constructor() {
        
    }
}
