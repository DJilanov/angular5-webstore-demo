import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReCaptchaComponent } from 'angular2-recaptcha';

import { BackendService } from '../../../../core/backend/backend.service';
import { EventBusService } from '../../../../core/event-bus/event-bus.service';
import { CartService } from '../../../../services/cart/cart.service';
import { TranslateService } from '../../../../shared/translation/services/translate.service';

import { OrderModel } from '../../../../models/order.model';
import { ProductModel } from '../../../../models/product.model';

@Component({
    selector: 'app-order-contact',
    styleUrls: ['./order-contact.component.scss'],
    templateUrl: './order-contact.component.html'
})

export class OrderContactComponent {

    @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;

    public phoneNumbers = ['0878422063', '0878613400'];
    public language: string;
    public formData: OrderModel = new OrderModel();

    public correctCaptcha: boolean = false;

    public messageSuccess: boolean;
    public messageFail: boolean;

    constructor(
        private router: Router,
        private cartService: CartService,
        private backendService: BackendService,
        private eventBusService: EventBusService,
        private translateService: TranslateService,
    ) {
        this.formData.products = this.cartService.getCartProductsAsLocalstorageModel();
        this.language = this.translateService.getLanguage();
    };

    ngOnInit() {
        this.eventBusService.emitTranslate({});
    }

    handleCorrectCaptcha() {
        this.correctCaptcha = true;
    }

    handleExpireCaptcha() {
        this.correctCaptcha = false;
    }

    submitForm() {
        this.backendService.sendOrder(this.formData).subscribe(
            data => {
                this.messageSuccess = true;
                this.captcha.reset();
                this.router.navigate(['order/check-order', data.json().orderId || 1]);
            },
            err => this.messageFail = true
        );
    }
}
