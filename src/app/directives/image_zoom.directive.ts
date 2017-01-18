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
    private zoomType: string = 'absolute';
    // shall we repeat the image or no
    @Input()
    private imageRepeat: Boolean = false;
    // it can true ( it will show the zoom container only when you click ) or false ( that on hover you will see the zoom container)
    @Input()
    private clickToZoom: Boolean = false;
    // it can get the image based on different attribute than src of the image ( you can use data-image for larger img than the basic image source )
    @Input()
    private getImageByAttribute: string = '';
    // on which side of the image we will show the lens
    // todo: add lens type
    @Input()
    private absolutePosition: string = 'right';
    // we can add custom sizes to the widget (they are added in the end )
    @Input()
    private customStyle: Object = {};
    // Shall we add border or no
    @Input()
    private border: Boolean = true;
    // if we have border what styles you prefer to it
    @Input()
    private borderStyle: string = '1px solid black';
    // what color we will show behind the image
    @Input()
    private backgroundColor: string = 'white';
    // what pos coef we will use
    @Input()
    private posCoef: number = 1.1;
    // used to allow the user with a single click to make it full screen when he wants
    // todo
    @Input()
    private fullScreenOnClick: Boolean = false;
    

    //TODO options
    /*
        fullScreenOnClick: boolean that enables when click to open full screen and when no click to just check it out
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
        element.style.backgroundColor = this.backgroundColor;
        element.style.backgroundPosition = (-posX * this.posCoef) + "px " + (-posY * this.posCoef) + "px";
        element.style.zIndex = '9999';
        if(!this.imageRepeat) {
            element.style.backgroundRepeat = 'no-repeat';
        }
        if(this.border) {
            element.style.border = this.borderStyle;
        }
        if(this.zoomType == 'absolute') {
            element.style.position = 'absolute';

            this.setSizeBasedOnTheScreen(element, img);
        } else {
            element.style.width = this.width;
            element.style.height = this.height;
        }
        for(const key of Object.keys(this.customStyle)) {
            element.style[key] = this.customStyle[key];
        }
        document.body.appendChild(element);
    }

    // used to move the zoom
    private moveZooming(event: MouseEvent) {
        let element = document.getElementById("image-zoom-overlay");
        let img = event.target;
        let posX = event.offsetX ? (event.offsetX) : event.pageX - img['offsetLeft'];
        let posY = event.offsetY ? (event.offsetY) : event.pageY - img['offsetTop'];
        element.style.backgroundPosition = (-posX * this.posCoef) + "px " + (-posY * this.posCoef) + "px";
    }

    // used to remove the zoom container
    private zoomOut() {
        let element = document.getElementById("image-zoom-overlay");
        element.parentElement.removeChild(element);
    }

    // only if it is absolute zoomer
    private setSizeBasedOnTheScreen(element, image) {
        let imageBounds = image.getBoundingClientRect();
        if(this.absolutePosition != 'left') {
            element.style.top = imageBounds.top + 'px';
            element.style.left = ( imageBounds.left + imageBounds.width ) + 'px';
            let basicHeight = ( window.innerHeight - imageBounds.top );
            element.style.width = ( basicHeight * image.width / image.height ) + 'px';
            element.style.height = basicHeight + 'px';
        } else {
            element.style.top = imageBounds.top + 'px';
            let basicHeight = ( window.innerHeight - imageBounds.top );
            let basicWidth = ( basicHeight * image.width / image.height );
            element.style.height = basicHeight + 'px';
            element.style.width = basicWidth + 'px';
            element.style.left = ( window.innerWidth - ( imageBounds.left - basicWidth )) + 'px';
        }
    }


    constructor(el: ElementRef) {

    }
}