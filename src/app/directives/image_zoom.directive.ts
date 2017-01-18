import { Directive, Input, ElementRef, HostListener } from '@angular/core';
@Directive({ selector: '[image-zoom]' })
export class ImageZoomDirective {
    // it can be pixels ( absolute size ) or remaining-screen ( it will cover the remaining screen )
    @Input()
    private width: string = '200px';
    @Input()
    private height: string = '200px';
    // it can be absolute ( flying container ) or lens ( simple google )
    // TODO
    @Input()
    private type: string = 'absolute';
    // it can true ( it will show the zoom container only when you click ) or false ( that on hover you will see the zoom container)
    @Input()
    private clickToZoom: Boolean = false;
    // it can true ( it will show the zoom container only when you click ) or false ( that on hover you will see the zoom container)
    @Input()
    private getImageByAttribute: string = '';
    

    //TODO options
    /*
        type: lens || absolute
        clickToZoom: true || false
        otherImageAttribute: We can set data atribute to the image we hover that we will use in our zoomer
    */

    // inner variables
    private activated: Boolean = true;


    @HostListener('mouseenter', ['$event'])
    onMouseEnter(event) {
        if(!this.clickToZoom) {
            this.activated = true;
            this.zoomIn(event);
        }
    }

    @HostListener('mousedown', ['$event'])
    onMouseClick(event) {
        if(this.clickToZoom) {
            this.activated = true;
            this.zoomIn(event);
        }
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        if(this.activated) {
            this.moveZooming(event);
        }
    }

    @HostListener('mouseleave', ['$event'])
    onMouseLeave(event) {
        this.activated = false;
        this.zoomOut();
    }

    // used to add and show the zoom container
    private zoomIn(event: MouseEvent) {
        let element = document.createElement('div');
        element.id = "image-zoom-overlay";
        element.style.display = "inline-block";
        let img = event.target;
        let posX = event.offsetX ? (event.offsetX) : event.pageX - img['offsetLeft'];
        let posY = event.offsetY ? (event.offsetY) : event.pageY - img['offsetTop'];
        if(this.getImageByAttribute.length > 0) {
            element.style.background = 'url("' + event.target[this.getImageByAttribute] + '")';
        } else {
            element.style.background = 'url("' + event.target['src'] + '")';
        }
        element.style.backgroundColor = 'white';
        element.style.backgroundPosition = (-posX * 2) + "px " + (-posY * 2) + "px";
        element.style.zIndex = '9999';
        element.style.position = 'absolute';
        element.style.width = this.width;
        element.style.height = this.height;
        event.target['parentElement'].appendChild(element);
    }

    // used to move the zoom
    private moveZooming(event: MouseEvent) {
        let element = document.getElementById("image-zoom-overlay");
        let img = event.target;
        let posX = event.offsetX ? (event.offsetX) : event.pageX - img['offsetLeft'];
        let posY = event.offsetY ? (event.offsetY) : event.pageY - img['offsetTop'];
        element.style.backgroundPosition = (-posX * 2) + "px " + (-posY * 2) + "px";
    }

    // used to remove the zoom container
    private zoomOut() {
        let element = document.getElementById("image-zoom-overlay");
        element.parentElement.removeChild(element);
    }


    constructor(el: ElementRef) {

    }
}