import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Language } from '../../language/language.service';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';
import { EventEmiterService } from '../../services/event.emiter.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'custom-details',
    styleUrls: ['./details.component.css'],
    templateUrl: './details.component.html'
})

export class DetailsComponent {

    private product: Object;

    private productLink: String;

    private imagesArray: Array<Object>;

    private productPrice: Object;

    private productOldPrice: Object;

    constructor(
        private language: Language,
        private routeParams: ActivatedRoute,
        private productsService: ProductsService,
        private eventEmiterService: EventEmiterService
    ) {
        this.routeParams.params.subscribe(params => this.setParams(params));
    };

    private setParams(params) {
        if(params['productLink']) {
            this.product = this.productsService.getProductByLink(params['productLink']);
            if(this.product == undefined) {
                this.product = {};
                this.productLink = params['productLink'];
                this.eventEmiterService.dataFetched.subscribe(data => this.onProductsUpdate(data.products));
                return;
            }
            this.productPrice = {
                class: '',
                price: this.product['new_price'],
                currency: this.language.getTexts('currency'),
            };
            this.productOldPrice = {
                class: 'line-through',
                price: this.product['old_price']
            };
            this.imagesArray = [this.product['main_image']].concat(this.product['other_images']);
        }
    }

    private onProductsUpdate(products) {
        if(this.productLink !== undefined) {
            this.product = this.productsService.getProductByLink(this.productLink);
            this.productPrice = {
                class: '',
                price: this.product['new_price'],
                currency: this.language.getTexts('currency'),
            };
            this.productOldPrice = {
                class: 'line-through',
                price: this.product['old_price']
            };
            this.imagesArray = [this.product['main_image']].concat(this.product['other_images']);
        }
    }
}
