import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Dictionary } from '../../dictionary/dictionary.service';
import { CartService } from '../../services/cart.service';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'product',
    styleUrls: ['./product.component.css'],
    templateUrl: './product.component.html'
})

export class ProductComponent {
    @Input()
    productObject: Object;

    @Output()
    productImage: Object = {};

    private blankImage: string = 'http://1.bp.blogspot.com/--Gn3G0ImmUo/VTvLaHI0ScI/AAAAAAAAAOI/LIqMbamy8jM/s1600/COMputer%2Bparts.jpg';

    private onAddToCart(product) {
        this.cartService.addToCart(product);
        // remove it when we have proper popup
        this.router.navigate(['cart']);
        return false;
    }

    constructor(
        private router: Router,
        private dictionary: Dictionary,
        private cartService: CartService
    ){}
}
