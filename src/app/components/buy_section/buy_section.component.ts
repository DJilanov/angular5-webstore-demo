import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dictionary } from '../../dictionary/dictionary.service';
import { EventEmiterService } from '../../services/event.emiter.service';
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';

@Component({
    selector: 'buy-section',
    styleUrls: ['./buy_section.component.css'],
    templateUrl: './buy_section.component.html'
})

export class BuySectionComponent implements OnInit {

    @Input()
    product: Object;

    private cartProducts: Array<Object> = [];

    constructor(
        private router: Router,
        private dictionary: Dictionary,
        private storage: LocalStorageService,
        private eventEmiterService: EventEmiterService
    ) {
        
    }
 
    public ngOnInit() {
        // we save the products in the cart via ID and amount. We later get the products by id
        this.cartProducts = this.storage.retrieve('cartProducts') || [];
    }
    

    private onAddToCart() {
        if(this.cartProducts == null) {
            this.cartProducts = [];
        }
        this.cartProducts.push(this.product);
        this.storage.store('cartProducts', this.cartProducts);
        this.eventEmiterService.emitAddToCart(this.product);
        this.router.navigate(['cart']);
    }
}
