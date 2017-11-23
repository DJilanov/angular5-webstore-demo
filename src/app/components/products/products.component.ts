import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Dictionary } from '../../dictionary/dictionary.service';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';
import { EventEmiterService } from '../../services/event.emiter.service';

@Component({
    selector: 'products',
    styleUrls: ['./products.component.css'],
    templateUrl: './products.component.html'
})

export class ProductsComponent {

    public products: Array<Object> = [];
    public categories: Array<Object> = [];

    constructor(
        public router: Router,
        public dictionary: Dictionary,
        public productsService: ProductsService,
        public categoriesService: CategoriesService,
        public eventEmiterService: EventEmiterService
    ) {
      this.products = productsService.getProducts();
      this.categories = categoriesService.getCategories();
      // on categories update we update the local array
      this.eventEmiterService.dataFetched.subscribe(data => this.onFetchedData(data));
      this.eventEmiterService.changedProduct.subscribe(data => this.onChangedProduct(data));
    };    

    public onChangedProduct(product) {
      for(var productsCounter = 0; productsCounter < this.products.length; productsCounter++) {
        if(this.products[productsCounter]['_id'] == product.response._id) {
          this.products[productsCounter] = product.response;
        }
      }
    }

    public productsByCategory(category) {
        return this.productsService.getProductsByCategory(category.products);
    }
    
    public onFetchedData(data) {
      this.products = data.products;
      this.categories = data.categories;
    }

    public showEditModal(product) {
      this.eventEmiterService.emitShowProductModal({
          'product': product,
          'action': 'edit',
          'title':'editProduct', 
          "btnText": "editProduct"
      });
    }

    public showAddNewModal() {
      this.eventEmiterService.emitShowProductModal({
          'product': {
            "category": "",
            "title": {
                "bg": "",
                "en": ""
            },
            "description": {
                "bg": "",
                "en": ""
            },
            "more_info": {
                "bg": "",
                "en": ""
            },
            "more_details": {
                "bg": "",
                "en": ""
            },
            "params": {
                "bg": [],
                "en": []
            },
            "new_price": "",
            "old_price": "",
            "daily_offer": false,
            "zIndex": 0,
            "shown": true,
            "count": 0,
            
            "rating": 4.7,
            "is_new": true,
            "carousel": false,
            "link": "",
            "make": "",
            "main_image": "",
            "other_images": []
          },
          'action': 'create',
          'title':'createProduct', 
          "btnText": "createProduct"
      });
    }
}
