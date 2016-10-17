import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Language } from '../../language/language.service';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

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
        private categoriesService: CategoriesService
    ) {
      this.products = productsService.getProducts();
      this.categories = categoriesService.getCategories();
      // on categories update we update the local array
      this.productsService.productsUpdate.subscribe(products => this.onProductsUpdate(products));
      this.categoriesService.categoriesUpdate.subscribe(categories => this.onCategoriesUpdate(categories));
    };

    private onCategoriesUpdate(categories) {
      this.categories = categories;
    }

    private onProductsUpdate(products) {
      this.products = products;
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
