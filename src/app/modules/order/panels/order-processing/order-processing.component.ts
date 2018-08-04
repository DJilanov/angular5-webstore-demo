import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../../../../services/cart/cart.service';
import { TranslateService } from '../../../../shared/translation/services/translate.service';

import { ProductModel } from '../../../../models/product.model';

@Component({
    selector: 'app-order-processing',
    styleUrls: ['./order-processing.component.scss'],
    templateUrl: './order-processing.component.html'
})

export class OrderProcessingComponent {

    public language: string;
    public orderNumer: string;

    constructor(
        private router: Router,
        private cartService: CartService,
        private translateService: TranslateService
    ) {
        this.language = this.translateService.getLanguage();
        this.setDynamicPages();
    };

    private setDynamicPages() {
        let splitted = this.router.url.split('/');
        this.orderNumer = splitted[splitted.length - 1];
    }
}
