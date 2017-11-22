import { Component, Input } from '@angular/core';
import { Dictionary } from '../../dictionary/dictionary.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';
import { EventEmiterService } from '../../services/event.emiter.service';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'suggestion-list',
    styleUrls: ['./suggestion_list.component.css'],
    templateUrl: './suggestion_list.component.html'
})

export class SuggestionListComponent {

    @Input()
    public product: Object;

    public category: Object = {};
    public products: Array<Object> = [];

    constructor(
        public router: Router,
        public dictionary: Dictionary,
        public productsService: ProductsService
    ) {};

    ngOnChanges(changes: any) {
        this.category = this.product['category'];
        this.products = this.products.concat(this.productsService.getProductsByCategory(this.product['category']));
        this.products = this.products.concat(this.productsService.getProductsByNotCategory(this.product['category']));
    }
}
