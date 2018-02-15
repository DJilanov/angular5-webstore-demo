import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { BackendService } from '../../core/backend/backend.service';
import { EventBusService } from '../../core/event-bus/event-bus.service';
import { TranslateService } from '../../shared/translation/services/translate.service';
import { ErrorHandlerService } from '../../core/error-handler/error-handler.service';

import { AuthService } from '../../services/auth/auth.service';
import { UtilsService } from '../../services/utils/utils.service';
import { ProductsService } from '../../services/products/products.service';

import { SearchModel } from './product.search.model';
import { ProductModel } from '../../services/products/product.model';

const sharredOptions = {
	header: true,
	footer: true
};

@Component({
    selector: 'products',
    styleUrls: ['./products.component.scss'],
    templateUrl: './products.component.html'
})

export class ProductsComponent {
    public products: Array<ProductModel>;
    public searchData: SearchModel = new SearchModel;

    constructor(
        private router: Router,
        private utilsService: UtilsService,
        private productsService: ProductsService,
        private eventBusService: EventBusService,
        private translateService: TranslateService,
        private errorHandlerService: ErrorHandlerService,
    ) {
      this.products = this.productsService.getProducts();
      this.eventBusService.emitChangeSharedOptions(sharredOptions);
      this.eventBusService.productsUpdate.subscribe(products => this.onProductsUpdate(products));
    };

    private onProductsUpdate(eventData) {
      this.products = eventData.product;
    }
    
    public getLanguage() {
      return this.translateService.getLanguage();
    }

    public filterProducts(eventData) {
      this.searchData[eventData.target.name] = eventData.target.value;
      this.products = this.utilsService.cloneObject(this.productsService.getProducts());

      for(let param in this.searchData) {
        if(this.searchData[param] && this.searchData[param].length) {
          this.products = this.products.filter((product) => {
            if(product[param]) {
              if(typeof product[param] === 'object') {
                return product[param][this.getLanguage()].toString().toLowerCase().includes(this.searchData[param].toString().toLowerCase());
              } else {
                return product[param].toString().toLowerCase().includes(this.searchData[param].toString().toLowerCase());
              }
            }
          });
        }
      }
    }
    
    public create() {
      this.router.navigate(['/product/']);
    }

    public edit(product) {
      this.router.navigate(['/product/' + product.id]);
    }
}
