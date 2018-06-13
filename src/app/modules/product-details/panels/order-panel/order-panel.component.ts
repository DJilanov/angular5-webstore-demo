import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '../../../../shared/translation/services/translate.service';

import { ProductModel } from '../../../../models/product.model';

@Component({
    selector: 'app-order-panel',
    styleUrls: ['./order-panel.component.scss'],
    templateUrl: './order-panel.component.html'
})

export class OrderPanelComponent {

    public language: string;
	@Input() product: ProductModel;

    constructor(
        private router: Router,
        private translateService: TranslateService
    ) {
        this.language = this.translateService.getLanguage();
    };
    
    public onAddToCart(product) {
        // this.cartService.addToCart(product);
        // remove it when we have proper popup
        this.router.navigate(['cart']);
        return false;
    }
}
