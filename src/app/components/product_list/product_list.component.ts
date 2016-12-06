import { Component, Input, OnInit } from '@angular/core';
import { MetaService } from 'ng2-meta';
import { Dictionary } from '../../dictionary/dictionary.service';
import { Router, ActivatedRoute } from '@angular/router';
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

    private categoryLink: String;

    /**
     * @constructor on init
     */
    public constructor(
        private router: Router,
        private dictionary: Dictionary,
        private metaService: MetaService,
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
            this.category = this.categoriesService.getCategoryByLink(params['category']);
            if(this.category == undefined) {
                this.category = {};
                this.products = [];
                this.categoryLink = params['category'];
                this.eventEmiterService.dataFetched.subscribe(data => this.onFetchedData(data));
                return;
            }
            this.products = this.productsService.getProductsByCategory(this.category['products']);
        }
    }

    private onFetchedData(data) {
      this.category = this.categoriesService.getCategoryByLink(this.categoryLink);
      this.products = this.productsService.getProductsByCategory(this.category['products']);
    }

    private changeTitle(data) {
        if(this.router.url.indexOf('/products') !== -1) {
            if(this.category['title']) {
                this.metaService.setTitle(this.category['title'].bg);
                this.metaService.setTag('og:image',this.products[0]['main_image']);
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
