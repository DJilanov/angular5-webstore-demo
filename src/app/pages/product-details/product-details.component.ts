import { Component, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EventBusService } from '../../core/event-bus/event-bus.service';

const sharredOptions = {
	header: true,
	footer: true
};

@Component({
    selector: 'product-details',
    styleUrls: ['./product-details.component.scss'],
    templateUrl: './product-details.component.html'
})

export class ProductDetailsComponent {
  constructor(
      private router: Router,
      public routeParams: ActivatedRoute,
      private eventBusService: EventBusService
  ) {
      this.routeParams.params.subscribe(params => this.setParams(params));
  };
  
  public setParams(params) {
      // if(params['productLink']) {
      //     this.product = this.productsService.getProductByLink(params['productLink']);
      //     if(this.product == undefined) {
      //         this.product = {};
      //         this.productLink = params['productLink'];
      //         this.eventEmiterService.dataFetched.subscribe(data => this.onProductsUpdate(data.products));
      //         return;
      //     }
      //     this.productPrice = {
      //         class: '',
      //         price: this.product['new_price'],
      //         currency: this.dictionary.getTexts('currency'),
      //     };
      //     this.productOldPrice = {
      //         class: 'line-through',
      //         price: this.product['old_price']
      //     };
      //     this.imagesArray = [this.product['main_image']].concat(this.product['other_images']);
      // }
  }
}
