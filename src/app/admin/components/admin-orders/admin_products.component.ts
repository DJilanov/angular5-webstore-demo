import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Dictionary } from '../../../dictionary/dictionary.service';
import { ProductsService } from '../../../services/products.service';
import { CategoriesService } from '../../../services/categories.service';
import { EventEmiterService } from '../../../services/event.emiter.service';

@Component({
    selector: 'admin-products',
    styleUrls: ['./admin_products.component.css'],
    templateUrl: './admin_products.component.html'
})

export class AdminProductsComponent {

    private products: Array<Object>;
    private categories: Array<Object>;

    constructor(
        private router: Router,
        private dictionary: Dictionary,
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

    private showEditModal(product) {
      this.eventEmiterService.emitShowProductModal({
          'product': product,
          'action': 'edit',
          'title':'editProduct', 
          "btnText": "editProduct"
      });
    }

    private showAddNewModal() {
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
