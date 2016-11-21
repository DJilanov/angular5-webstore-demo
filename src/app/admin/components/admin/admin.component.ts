import { Component, Input, Output, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Language } from '../../language/language.service';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';
import { EventEmiterService } from '../../services/event.emiter.service';

@Component({
    selector: 'admin',
    styleUrls: ['./admin.component.css'],
    templateUrl: './admin.component.html'
})

export class AdminComponent implements OnInit {
   private adminLoginFormModel: Object = {
        title: this.language.getTexts('contactFormTitle'),
        formFields: [
            {
                label: this.language.getTexts('contactFormYourName'),
                targetName: "name",
                inputType: "text",
                required: true,
                validation: [<any>Validators.required, <any>Validators.maxLength(40)],
                placeholder: this.language.getTexts('contactFormYourNameEnter')
            },
            {
                label: this.language.getTexts('contactFormYourEmail'),
                targetName: "email",
                inputType: "email",
                required: true,
                validation: [<any>Validators.required, <any>Validators.pattern(this.emailValidationRegex)],
                placeholder: this.language.getTexts('contactFormYourEmailEnter')
            },
            {
                label: this.language.getTexts('contactFormYourPhoneNumber'),
                targetName: "phone",
                inputType: "phone",
                required: true,
                validation: [<any>Validators.required, <any>Validators.pattern(this.phoneValidationRegex)],
                placeholder: this.language.getTexts('contactFormYourPhoneNumberEnter')
            },
            {
                label: this.language.getTexts('contactFormYourMessage'),
                targetName: "message",
                inputType: "textarea",
                required: true,
                validation: [<any>Validators.required, <any>Validators.minLength(10)],
                placeholder: this.language.getTexts('contactFormYourMessageEnter')
            }
        ],
        submitBtn: {
            class: "btn btn-default",
            text: this.language.getTexts('contactFormSend')
        },
        captcha: true,
        owner: this
    };

    private products =  Array<Object>();

    private categories = Array<Object>();

    constructor(
        private language: Language,
        private productsService: ProductsService,
        private categoriesService: CategoriesService,
        private eventEmiterService: EventEmiterService
    ) {
      this.products = productsService.getProducts();
      this.categories = categoriesService.getCategories();
      // on categories update we update the local array
      this.eventEmiterService.dataFetched.subscribe(data => this.onFetchedData(data));
    };

    private onFetchedData(data) {
      this.products = data.products;
      this.categories = data.categories;
    }

    private login(data) {
      
    }

    private productsByCategory(category) {
      return this.productsService.getProductsByCategory(category.products);
    }
    /**
     * @ngOnInit on init
     */
    public ngOnInit() {
        
    }
}
