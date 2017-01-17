import { Component, Input } from '@angular/core';

@Component({
    selector: 'zoomable-images',
    styleUrls: ['./zoomable_images.component.css'],
    templateUrl: './zoomable_images.component.html'
})

export class ZoomableImagesComponent {
    
    @Input()
    zoomableImages: Array<Object>;

    @Input()
    alt: String;

    private selectedImage: Object;

    private selectImage(image) {
        this.selectedImage = image;
    }

    private zoomIn(event) {
        var element = document.getElementById("overlay");
        element.style.display = "inline-block";
        var img = document.getElementById("imgZoom");
        var posX = event.offsetX ? (event.offsetX) : event.pageX - img.offsetLeft;
        var posY = event.offsetY ? (event.offsetY) : event.pageY - img.offsetTop;
        element.style.backgroundPosition = (-posX * 4) + "px " + (-posY * 4) + "px";
    }

    private zoomOut(event) {
        var element = document.getElementById("overlay");
        element.style.display = "none";
    }

    constructor() {
        if(this.zoomableImages !== undefined) {
            this.selectedImage = this.zoomableImages[0];
        }
    }
}
