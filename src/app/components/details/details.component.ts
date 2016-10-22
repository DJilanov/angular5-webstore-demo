import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Language } from '../../language/language.service';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'details',
    styleUrls: ['./details.component.css'],
    templateUrl: './details.component.html'
})

export class DetailsComponent {

    private products =  Array<Object>();

    private product: Object;

    private productLink: String;

    constructor(
        private language: Language,
        private routeParams: ActivatedRoute,
        private productsService: ProductsService,
    ) {
        var self = this;
        this.routeParams.params.subscribe(params => this.setParams(params));
    };

    private setParams(params) {
        if(params['productLink']) {
            this.product = this.productsService.getProductByLink(params['productLink']);
            if(this.product == undefined) {
                this.product = {};
                this.productLink = params['productLink'];
                this.productsService.productsUpdate.subscribe(products => this.onProductsUpdate(products));
                return;
            }
        }
    }

    private onProductsUpdate(products) {
        if(this.productLink !== undefined) {
            this.product = this.productsService.getProductByLink(this.productLink);
        }
    }
}
