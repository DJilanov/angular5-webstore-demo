import { Component, OnInit } from '@angular/core';
import { MetaService } from 'ng2-meta';
import { Dictionary } from '../../dictionary/dictionary.service';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';
import { EventEmiterService } from '../../services/event.emiter.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'custom-details',
    styleUrls: ['./details.component.css'],
    templateUrl: './details.component.html'
})

export class DetailsComponent implements OnInit {

    private product: Object;

    private productLink: String;

    private imagesArray: Array<Object>;

    private productPrice: Object;

    private productOldPrice: Object;

    constructor(
        private router: Router,
        private dictionary: Dictionary,
        private metaService: MetaService,
        private routeParams: ActivatedRoute,
        private productsService: ProductsService,
        private eventEmiterService: EventEmiterService
    ) {
        this.routeParams.params.subscribe(params => this.setParams(params));
        // TODO: REFACTOR IT!!!! ITS FIRING 7 TIMES FFS
        this.router.events.subscribe(data => this.changeTitle(data));
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
                currency: this.dictionary.getTexts('currency'),
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
                currency: this.dictionary.getTexts('currency'),
            };
            this.productOldPrice = {
                class: 'line-through',
                price: this.product['old_price']
            };
            this.imagesArray = [this.product['main_image']].concat(this.product['other_images']);
        }
    }

    private changeTitle(data) {
        if(this.router.url.indexOf('/details') !== -1) {
            if(this.product['title']) {
                this.metaService.setTitle(this.product['title'].bg);
                this.metaService.setTag('og:image',this.product['main_image']);
            } else {
                this.metaService.setTitle('Всичко за вашия компютър на най-конкурентни цени в Жиланов ЕООД!');
                this.metaService.setTag('og:image','./src/img/navigation-logo.png');
            }
        }
    }

    ngOnInit() {
        this.metaService.setTitle('Всичко за вашия компютър на най-конкурентни цени в Жиланов ЕООД!');
        this.metaService.setTag('og:image','./src/img/navigation-logo.png');
    }
}
