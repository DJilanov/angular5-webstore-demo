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

    private blankImage: string = '//s-media-cache-ak0.pinimg.com/236x/dd/57/f6/dd57f6c1ef849ffe61bd073c6d23784e.jpg';

    private onAddToCart(product) {
        this.cartService.addToCart(product);
        // remove it when we have proper popup
        this.router.navigate(['cart']);
    }

    private changeRoute(route) {
        if(event.target['className'].indexOf('btn') == -1) {
            this.router.navigate(route);
        }
    }

    constructor(
        private router: Router,
        private dictionary: Dictionary,
        private cartService: CartService
    ){}
}
