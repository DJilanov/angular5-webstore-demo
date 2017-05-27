import { Component, Input, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Dictionary } from '../../dictionary/dictionary.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';
import { EventEmiterService } from '../../services/event.emiter.service';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'product-list',
    styleUrls: ['./product_list.component.css'],
    templateUrl: './product_list.component.html'
})

export class ProductListComponent implements OnInit {
    @Input()
    products: Array<Object> = [];

    @Input()
    category: Object = {};

    private categoryUrl: any;

    private categoryLink: String;

    /**
     * @constructor on init
     */
    public constructor(
        private router: Router,
        private dictionary: Dictionary,
        private metaService: Meta,
        private sanitizer: DomSanitizer,
        private routeParams: ActivatedRoute,
        private productsService: ProductsService,
        private categoriesService: CategoriesService,
        private eventEmiterService: EventEmiterService
    ) {
        this.routeParams.params.subscribe(params => this.setParams(params));
        // TODO: REFACTOR IT!!!! ITS FIRING 7 TIMES FFS
        this.router.events.subscribe(data => this.changeTitle(data));
    }

    private setParams(params) {
        if(params['category']) {
            let category = params.category.toLowerCase();
            this.category = this.categoriesService.getCategoryByLink(category);
            if(this.category == undefined) {
                this.category = {};
                this.products = [];
                this.categoryLink = category;
                this.eventEmiterService.dataFetched.subscribe(data => this.onFetchedData(data));
                return;
            }
            this.categoryUrl = this.transform('products/' + this.category['link']);
            this.products = this.productsService.getProductsByCategory(this.category['products']);
        }
    }

    private onFetchedData(data) {
        this.category = this.categoriesService.getCategoryByLink(this.categoryLink);
        this.products = this.productsService.getProductsByCategory(this.category['products']);
        this.categoryUrl = this.transform('products/' + this.category['link']);
    }

    private changeTitle(data) {
        if(this.router.url.indexOf('/products') !== -1) {
            if((this.category['title']) && (this.products[0])) {
                this.metaService.updateTag({
                    "content": this.category['title'].bg
                },
                    "property= 'title'"
                );
                this.metaService.updateTag({
                    "content": this.products[0]['main_image']
                },
                    "property= 'og:image'"
                );
            } else {
                this.metaService.updateTag({
                    "content": 'Всичко за вашия компютър на най-конкурентни цени в Жиланов ЕООД!'
                },
                    "property= 'title'"
                );
                this.metaService.updateTag({
                    "content": './src/img/navigation-logo.png'
                },
                    "property= 'og:image'"
                );
            }
        }
    }

    transform(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    ngOnInit() {
        this.metaService.updateTag({
            "content": 'Всичко за вашия компютър на най-конкурентни цени в Жиланов ЕООД!'
        },
            "property= 'title'"
        );
        this.metaService.updateTag({
            "content": './src/img/navigation-logo.png'
        },
            "property= 'og:image'"
        );
    }

    ngOnChanges(changes: any) {
        this.categoryUrl = this.transform('products/' + this.category['link']);
    }
}
