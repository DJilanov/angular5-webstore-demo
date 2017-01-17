import { Directive, Input, ElementRef, HostListener } from '@angular/core';
@Directive({ selector: '[image-zoom]' })
export class ImageZoomDirective {
    // options
    @Input()
    private width: string = '200px';

    @Input()
    private height: string = '200px';

    //TODO options
    /*
        type: lens || absolute
        clickToZoom: true || false
        otherImageAttribute: We can set data atribute to the image we hover that we will use in our zoomer
    */

    // inner variables
    private mouseHover: Boolean = true;


    @HostListener('mouseenter', ['$event'])
    onMouseEnter(event) {
        this.mouseHover = true;
        this.zoomIn(event);
    }

    @HostListener('mousemove', ['$event'])
    onMousemove(event: MouseEvent) {
        if(this.mouseHover) {
            this.moveZooming(event);
        }
    }

    @HostListener('mouseleave', ['$event'])
    onMouseLeave(event) {
        this.mouseHover = false;
        this.zoomOut();
    }

    // used to show the zoom container
    private zoomIn(event: MouseEvent) {
        let element = document.createElement('div');
        element.id = "image-zoom-overlay";
        element.style.display = "inline-block";
        let img = event.target;
        let posX = event.offsetX ? (event.offsetX) : event.pageX - img['offsetLeft'];
        let posY = event.offsetY ? (event.offsetY) : event.pageY - img['offsetTop'];
        element.style.background = 'url("' + event.target['src'] + '")';
        element.style.backgroundColor = 'white';
        element.style.backgroundPosition = (-posX * 2) + "px " + (-posY * 2) + "px";
        element.style.zIndex = '9999';
        element.style.position = 'absolute';
        element.style.width = this.width;
        element.style.height = this.height;
        event.target['parentElement'].appendChild(element);
    }

    // used to move the zoom lens
    private moveZooming(event: MouseEvent) {
        let element = document.getElementById("image-zoom-overlay");
        let img = event.target;
        let posX = event.offsetX ? (event.offsetX) : event.pageX - img['offsetLeft'];
        let posY = event.offsetY ? (event.offsetY) : event.pageY - img['offsetTop'];
        element.style.backgroundPosition = (-posX * 2) + "px " + (-posY * 2) + "px";
    }

    // used to hide the zoom container
    private zoomOut() {
        let element = document.getElementById("image-zoom-overlay");
        element.parentElement.removeChild(element);
    }


    constructor(el: ElementRef) {

    }
}