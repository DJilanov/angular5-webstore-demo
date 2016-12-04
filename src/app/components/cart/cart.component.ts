import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { Dictionary } from '../../dictionary/dictionary.service';
import { EventEmiterService } from '../../services/event.emiter.service';
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';

@Component({
    selector: 'cart',
    styleUrls: ['./cart.component.css'],
    templateUrl: './cart.component.html'
})

export class CartComponent implements OnInit {

    public cartCategory: Object = {};

    public cartProducts: Array<Object> = [];

    private emailValidationRegex: string = '^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';

    private phoneValidationRegex: string = '^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$';

    private messageSuccess: boolean = false;

    private messageFail: boolean = false;
    
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
            }
        ],
        submitBtn: {
            class: "btn btn-default",
            text: this.dictionary.getTexts('contactFormSend')
        },
        captcha: true,
        owner: this
    };

    private onContactFormSubmit(formData) {
        this.fetcherService.sendMessage(formData.value).subscribe(
            response => this.onMessageSend(response, formData),
            err => this.onMessageFail(err)
        );
    }

    private onMessageSend(response, formData) {
        this.messageSuccess = true;
        formData.reset();
    }

    private onMessageFail(err) {
        this.messageFail = true;
        this.errorHandlerService.handleError(err)
    }

    private addProduct(product) {
        this.cartProducts.push(product);
        //TODO: ADD IT TO THE LOCALSTORAGE TOO
    }
 
    public ngOnInit() {
        // we save the products in the cart via ID and amount. We later get the products by id
        this.cartProducts = this.storage.retrieve('cartProducts');
    }
    // USED WHEN WE FINISH THE ORDER AND IT IS SENDED TO THE BACK-END
    private orderSuccessfull(data) {
        // EMPTY THE STORAGE
    }

    constructor(
        private dictionary: Dictionary,
        private storage: LocalStorageService,
        private eventEmiterService: EventEmiterService
    ) {
        this.eventEmiterService.addToCart.subscribe(product => this.addProduct(product));
    }
}
