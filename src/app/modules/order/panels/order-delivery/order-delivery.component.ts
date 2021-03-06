import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../../../../services/cart/cart.service';
import { TranslateService } from '../../../../shared/translation/services/translate.service';

import { ProductModel } from '../../../../models/product.model';

@Component({
    selector: 'app-order-delivery',
    styleUrls: ['./order-delivery.component.scss'],
    templateUrl: './order-delivery.component.html'
})

export class OrderDeliveryComponent {

    public language: string;
	@Input() product: ProductModel;

    constructor(
        private router: Router,
        private cartService: CartService,
        private translateService: TranslateService
    ) {
        this.language = this.translateService.getLanguage();
    };
}
