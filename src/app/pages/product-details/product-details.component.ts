import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EventBusService } from '../../core/event-bus/event-bus.service';
import { ProductsService } from '../../services/products/products.service';
import { TranslateService } from '../../shared/translation/services/translate.service';

import { ProductModel } from '../../services/products/product.model';
import { CarouselModel } from '../../components/carousel/carousel.model';

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
        this.routeParams.params.subscribe(params => this.setParams(params));
    };
    
    ngOnInit() {
		this.eventBusService.emitTranslate({});
    }
    
    public setParams(params) {
        if(params['productLink']) {
            this.language = this.translateService.getLanguage();
            this.product = this.productsService.getProductByLink(params['productLink']);
            if(this.product == undefined) {
                this.product = new ProductModel();
                this.productLink = params['productLink'];
                this.eventBusService.productsUpdate.subscribe(() => this.setParams(this.productLink));
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
