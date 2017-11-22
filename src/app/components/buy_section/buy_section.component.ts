import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Dictionary } from '../../dictionary/dictionary.service';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'buy-section',
    styleUrls: ['./buy_section.component.css'],
    templateUrl: './buy_section.component.html'
})

export class BuySectionComponent {

    @Input()
    product;

    public cartProducts: Array<Object> = [];

    constructor(
        public router: Router,
        public dictionary: Dictionary,
        public cartService: CartService
    ) {}
    

    public onAddToCart() {
        this.cartService.addToCart(this.product);
        // remove it when we have proper popup
        this.router.navigate(['cart']);
    }
}
