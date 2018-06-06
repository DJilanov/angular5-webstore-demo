import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { EventBusService } from '../../core/event-bus/event-bus.service';
import { ProductsService } from '../../services/products/products.service';
import { TranslateService } from '../../shared/translation/services/translate.service';

import { ProductModel } from '../../models/product.model';

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
        private productsService: ProductsService,
        private eventBusService: EventBusService,
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
