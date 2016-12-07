import { Component, Input } from '@angular/core';

@Component({
    selector: 'zoomable-images',
    styleUrls: ['./zoomable_images.component.css'],
    templateUrl: './zoomable_images.component.html'
})

export class ZoomableImagesComponent {
    
    @Input()
    zoomableImages: Array<Object>;

    private selectedImage: Object;

    private selectImage(image) {
        this.selectedImage = image;
    }
    
    constructor() {
        if(this.zoomableImages !== undefined) {
            this.selectedImage = this.zoomableImages[0];
        }
    }
}
