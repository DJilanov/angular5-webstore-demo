import { Component, Input, Output } from '@angular/core';
import { Dictionary } from '../../dictionary/dictionary.service';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';
import { EventEmiterService } from '../../services/event.emiter.service';

@Component({
    selector: 'home',
    styleUrls: ['./home.component.css'],
    templateUrl: './home.component.html'
})

export class HomeComponent {
    // options of the inner carousel
    // todo: Fill it with the real images and items
    public carouselOptions:Object = {
      myInterval: 1000,
      noWrapSlides: false,
      slides: [{
        // static base image untill we fetch ( must be one of our website images)
        main_image: `//placekitten.com/1/1`,
        text: `test1`
      },{
        // static base image untill we fetch ( must be one of our website images)
        main_image: `//placekitten.com/2/1`,
        text: `test2`
      },{
        // static base image untill we fetch ( must be one of our website images)
        main_image: `//placekitten.com/1/2`,
        text: `test3`
      }]
    };

    private products =  Array<Object>();

    private categories = Array<Object>();

    constructor(
        private dictionary: Dictionary,
        private productsService: ProductsService,
        private categoriesService: CategoriesService,
        private eventEmiterService: EventEmiterService
    ) {
      this.products = productsService.getProducts();
      this.categories = categoriesService.getCategories();
      // we set the carousel slides becouse constructor is fired on router change to this page...
      this.setCarouselSlides();
      // on categories update we update the local array
      this.eventEmiterService.dataFetched.subscribe(data => this.onFetchedData(data));
    };

    private onFetchedData(data) {
      this.products = data.products;
      this.setCarouselSlides();
      this.categories = data.categories;
    }

    private setCarouselSlides() {
      // filter them correctly
      this.carouselOptions['slides'] = this.products.filter(function(product){
        // we check is it carousel promoted product
        if(product['carousel']) {
          return product;
        }
      });
    }

    private productsByCategory(category) {
      return this.productsService.getProductsByCategory(category.products);
    }
}
