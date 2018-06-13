import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EventBusService } from '../../core/event-bus/event-bus.service';
import { ProductsService } from '../../services/products/products.service';
import { TranslateService } from '../../shared/translation/services/translate.service';

import { ProductModel } from '../../models/product.model';
import { CarouselModel } from '../../models/carousel.model';

const sharredOptions = {
	header: true,
	footer: true
};

@Component({
    selector: 'product-details',
    styleUrls: ['./product-details.component.scss'],
    templateUrl: './product-details.component.html'
})

export class ProductDetailsComponent {
    
    private productLink: string;

    public starsRating: number;
    public product: ProductModel;
    public language: string;
    public imagesArray: CarouselModel[];

    constructor(
        private router: Router,
        private routeParams: ActivatedRoute,
        private eventBusService: EventBusService,
        private productsService: ProductsService,
        private translateService: TranslateService,
    ) {
        let splittedUrl = this.router.url.split('/');
        let productLink = splittedUrl[splittedUrl.length - 1];
        if(!productLink) {
            this.router.navigate(['/home']);
        } else {
            this.setProduct(productLink);
        }
    };
    
    ngOnInit() {
        this.eventBusService.emitTranslate({});
        this.starsRating = Math.round((Math.random() * (5 - 4.4) + 4.4) * 100) / 100;
    }
    
    public setProduct(productLink) {
        if(productLink) {
            this.language = this.translateService.getLanguage();
            this.product = this.productsService.getProductByLink(productLink);
            if(this.product == undefined) {
                this.product = new ProductModel();
                this.productLink = productLink;
                this.eventBusService.productsUpdate.subscribe(() => this.setProduct(this.productLink));
                return;
            }
            let images = [this.product['mainImage']].concat(this.product['otherImages']);
            this.imagesArray = images.map(image => {
                return {
                    title: this.product.title,
                    link: this.product.link,
                    image: image
                }
            });
        } else {
            this.router.navigate(['/home']);
        }
    }
}
