import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { EventBusService } from '../../core/event-bus/event-bus.service';
import { ProductsService } from '../../services/products/products.service';
import { TranslateService } from '../../shared/translation/services/translate.service';

import { CarouselModel } from '../../models/carousel.model';

const sharredOptions = {
	header: true,
	footer: true
};

declare var $: any;

@Component({
    selector: 'app-carousel',
    styleUrls: ['./carousel.component.scss'],
    templateUrl: './carousel.component.html'
})

export class CarouselComponent {

    @Input() products: CarouselModel[];
    @Input() enableRouting: boolean;
    @Input() zoom: boolean;

    public language: string;

    constructor(
        private router: Router,
        private translateService: TranslateService
    ) {
        this.language = this.translateService.getLanguage();
    };

    public onClick(product) {
        if(this.enableRouting) {
            this.router.navigate(['/details', product.link]);
        }
        if(this.zoom) {
            $('#carouselModal').modal({
                show: true
            })
        }
    }
}
