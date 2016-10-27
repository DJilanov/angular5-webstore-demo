import { Component, Input, Output, OnInit } from '@angular/core';
import { Language } from '../../language/language.service';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';
import { EventEmiterService } from '../../services/event.emiter.service';

@Component({
    selector: 'home',
    styleUrls: ['./home.component.css'],
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
    // options of the inner carousel
    // todo: Fill it with the real images and items
    public carouselOptions:Object = {
      myInterval: 3000,
      noWrapSlides: false,
      slides: [{
        image: `//placekitten.com/1599/300`,
        text: `test1`
      },{
        image: `//placekitten.com/1598/300`,
        text: `test2`
      },{
        image: `//placekitten.com/1597/300`,
        text: `test3`
      }]
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

    private productsByCategory(category) {
      return this.productsService.getProductsByCategory(category.products);
    }
    /**
     * @ngOnInit on init
     */
    public ngOnInit() {
        
    }
}
