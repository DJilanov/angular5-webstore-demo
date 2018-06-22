import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../../../../services/cart/cart.service';
import { TranslateService } from '../../../../shared/translation/services/translate.service';

import { ProductModel } from '../../../../models/product.model';

@Component({
    selector: 'app-order-contact',
    styleUrls: ['./order-contact.component.scss'],
    templateUrl: './order-contact.component.html'
})

export class OrderContactComponent {

    public language: string;

    constructor(
        private translateService: TranslateService
    ) {
        this.language = this.translateService.getLanguage();
    };
}
