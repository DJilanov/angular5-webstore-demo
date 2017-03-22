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
    public slides: Array<Object>;

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
      this.categories = data.categories;
      this.setCarouselSlides();
    }

    private setCarouselSlides() {
      // we sort the categories based on the array
      let categoriesArray = this.categories;
      let array = [];
      for(let categoriesCounter = 0; categoriesCounter < this.categories.length; categoriesCounter++) {
        array[+this.categories[categoriesCounter]['zIndex']] = this.categories[categoriesCounter];
      }
      categoriesArray = array.filter(function(n){ return n != undefined });
      // filter them correctly
      let carouselItems = this.products.filter(function(product){
        // we check is it carousel promoted product
        if(product['carousel']) {
          return product;
        }
      });
      let tmpArray = [];
      // we sort them based on category
      for(let categoryCounter = 0; categoryCounter < this.categories.length; categoryCounter++) {
        tmpArray = tmpArray.concat(
          carouselItems.filter(function(product){
            if(product['category'] == categoriesArray[categoryCounter]['products']) {
              return product;
            }
          })
        )
      }
      this.slides = tmpArray;
    }

    private sortCategories(categories) {
      let sortedCategories = [];
      for(let categoryCounter = 0; categoryCounter < categories.length; categoryCounter++) {
        sortedCategories[+this.categories[categoryCounter]['zIndex']] = this.categories[categoryCounter];
      }
      return sortedCategories.filter(function(n){ return n != undefined });
    }

    private productsByCategory(category) {
      return this.productsService.getProductsByCategory(category.products);
    }
}
