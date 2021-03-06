import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CategoriesService } from '../../services/categories/categories.service';
import { TranslateService } from '../../shared/translation/services/translate.service';
import { CartService } from '../../services/cart/cart.service';

import { ProductModel } from '../../models/product.model';

@Component({
    selector: 'app-product',
    styleUrls: ['./product.component.scss'],
    templateUrl: './product.component.html'
})

export class ProductComponent {

    public language: string;
    public categoryLink: string;
	@Input() product: ProductModel;

    constructor(
        private router: Router,
        private categoriesService: CategoriesService,
        private cartService: CartService,
        private translateService: TranslateService
    ) {
        this.language = this.translateService.getLanguage();
    };

    ngOnInit() {
        this.categoryLink = this.categoriesService.getCategoryByProductLink(this.product.category).link;
    }

    public blankImage: string = 'http://1.bp.blogspot.com/--Gn3G0ImmUo/VTvLaHI0ScI/AAAAAAAAAOI/LIqMbamy8jM/s1600/COMputer%2Bparts.jpg';
    
    public onAddToCart(product) {
      this.cartService.addCartProduct(this.product);
      this.router.navigate(['cart']);
    }

    public isNaN(number) {
        return !isNaN(number);
    }

    public isArray(array) {
        return Array.isArray(array)
    }
}
