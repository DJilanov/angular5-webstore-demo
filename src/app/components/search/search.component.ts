import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Language } from '../../language/language.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'search',
    styleUrls: ['./search.component.css'],
    templateUrl: './search.component.html'
})

export class SearchComponent {
    
    private products: Array<Object>;

    private searchQuery:string = '';

    constructor(
        private language: Language,
        private router: Router,
        private productsService: ProductsService
    ) {
      this.products = productsService.getProducts();
      this.addTypeaheadField();
      // on categories update we update the local array
      this.productsService.productsUpdate.subscribe(products => this.onProductsUpdate(products));
    };

    private onProductsUpdate(products) {
      this.products = products;
      this.addTypeaheadField();
    }

    private addTypeaheadField() {
      var params = '';
      for(var productCounter = 0; productCounter < this.products.length; productCounter++) {
        if(this.products[productCounter]['params']) {
          params = this.products[productCounter]['params'][this.language['language']].toString();
        } else {
          params = '';
        }
        this.products[productCounter]['typeahed'] = this.products[productCounter]['title'][this.language['language']] + ' ' + 
                                                    this.products[productCounter]['more_info'][this.language['language']] + ' ' +
                                                    this.products[productCounter]['description'][this.language['language']] + ' ' +
                                                    this.products[productCounter]['link'] + ' ' +
                                                    this.products[productCounter]['make'] + ' ' + params;
      }
    }

    private onProductSelect(selected) {
      this.router.navigate(['/details/', selected.item.link]);
    }
}
