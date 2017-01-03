import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Dictionary } from '../../dictionary/dictionary.service';
import { CartService } from '../../services/cart.service';
import { FetcherService } from '../../services/fetcher.service';
import { ErrorHandlerService } from '../../services/error.handler.service';
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';

@Component({
    selector: 'cart',
    styleUrls: ['./cart.component.css'],
    templateUrl: './cart.component.html'
})

export class CartComponent {

    public cartCategory: Object = {};

    public cartProducts: Array<Object> = [];

    private emailValidationRegex: string = '^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';

    private phoneValidationRegex: string = '^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$';

    private messageSuccess: boolean = false;

    private messageFail: boolean = false;

    private totalPrice: any = 0;
    
    private contactFormModel: Object = {
        title: this.dictionary.getTexts('contactOrderTitle'),
        formFields: [
            {
                label: this.dictionary.getTexts('contactFormYourName'),
                targetName: "name",
                inputType: "text",
                required: true,
                validation: [<any>Validators.required, <any>Validators.maxLength(40)],
                placeholder: this.dictionary.getTexts('contactFormYourNameEnter')
            },
            {
                label: this.dictionary.getTexts('contactFormYourEmail'),
                targetName: "email",
                inputType: "email",
                required: true,
                validation: [<any>Validators.required, <any>Validators.pattern(this.emailValidationRegex)],
                placeholder: this.dictionary.getTexts('contactFormYourEmailEnter')
            },
            {
                label: this.dictionary.getTexts('contactFormYourPhoneNumber'),
                targetName: "phone",
                inputType: "phone",
                required: true,
                validation: [<any>Validators.required, <any>Validators.pattern(this.phoneValidationRegex)],
                placeholder: this.dictionary.getTexts('contactFormYourPhoneNumberEnter')
            },
            {
                label: this.dictionary.getTexts('contactYourAddress'),
                targetName: "message",
                inputType: "textarea",
                required: true,
                validation: [<any>Validators.required, <any>Validators.minLength(10)],
                placeholder: this.dictionary.getTexts('contactYourAddressEnter')
            },
            {
                label: this.dictionary.getTexts('contactFormYourMoreInfo'),
                targetName: "moreinfo",
                inputType: "textarea",
                required: true,
                validation: [<any>Validators.required],
                placeholder: this.dictionary.getTexts('contactFormYourMoreInfoEnter')
            },
        ],
        submitBtn: {
            class: "btn btn-default",
            text: this.dictionary.getTexts('contactFormSend')
        },
        captcha: true,
        owner: this
    };

    private onOrderFormSubmit(formData) {
        let data = formData.value;
        data.products = [];
        for(let productCounter = 0; productCounter < this.cartProducts.length; productCounter++) {
            data.products.push({
                title: this.cartProducts[productCounter]['title'].bg,
                id: this.cartProducts[productCounter]['_id'],
                price: this.cartProducts[productCounter]['new_price'],
            });
        }
        data.totalPrice = this.totalPrice;
        this.fetcherService.sendOrder(data).subscribe(
            response => this.onOrderSend(response, formData),
            err => this.onMessageFail(err)
        );
    }

    private onOrderSend(response, formData) {
        this.cartService.emptyCart();
        formData.reset();
    }

    private onMessageFail(err) {
        this.messageFail = true;
        this.errorHandlerService.handleError(err)
    }

    private updateCart(products) {
        this.cartProducts = products;
        for(let productCounter = 0; productCounter < products.length; productCounter++) {
            this.totalPrice += parseFloat(products[productCounter]['new_price']);
        }
        if(isNaN(this.totalPrice)) {
            this.totalPrice = this.dictionary.getTexts('undefinedPrice');
        }
    }

    private removeProductFromCart(product) {
        this.cartProducts.filter(function(el) {
            if(el['_id'] !== product._id) {
                return el;
            }
        });
    }

    constructor(
        private dictionary: Dictionary,
        private storage: LocalStorageService,
        private fetcherService: FetcherService,
        private cartService: CartService,
        private errorHandlerService: ErrorHandlerService
    ) {
        // we save the products in the cart via ID and amount. We later get the products by id
        this.cartProducts = this.storage.retrieve('cartProducts') || [];
        this.updateCart(this.cartProducts);
        this.cartService.cartUpdate.subscribe(products => this.updateCart(products));
    }
}
