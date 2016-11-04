import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
    selector: 'zoomable-images',
    styleUrls: ['./zoomable_images.component.css'],
    templateUrl: './zoomable_images.component.html'
})

export class ZoomableImagesComponent {
    
    @Input()
    zoomableImages: Array<Object>;
    
    constructor() {
        
    }
}
