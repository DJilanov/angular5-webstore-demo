import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { EventBusService } from '../../core/event-bus/event-bus.service';
import { ProductsService } from '../../services/products/products.service';
import { TranslateService } from '../../shared/translation/services/translate.service';

import { ProductModel } from '../../models/product.model';

@Component({
    selector: 'app-product',
    styleUrls: ['./product.component.scss'],
    templateUrl: './product.component.html'
})

export class ProductComponent {

    public language: string;
	@Input() product: ProductModel;

    constructor(
        private router: Router,
        private productsService: ProductsService,
        private eventBusService: EventBusService,
        private translateService: TranslateService
    ) {
        this.language = this.translateService.getLanguage();
    };

    public blankImage: string = 'http://1.bp.blogspot.com/--Gn3G0ImmUo/VTvLaHI0ScI/AAAAAAAAAOI/LIqMbamy8jM/s1600/COMputer%2Bparts.jpg';
    
    public onAddToCart(product) {
        // this.cartService.addToCart(product);
        // remove it when we have proper popup
        this.router.navigate(['cart']);
        return false;
    }

    public isNaN(number) {
        return !isNaN(number);
    }

    public isArray(array) {
        return Array.isArray(array)
    }
}
