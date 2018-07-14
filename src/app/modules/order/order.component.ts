import { Component, Input, Output } from '@angular/core';
import { Router, NavigationEnd, Event as NavigationEvent } from '@angular/router';

import { CartService } from '../../services/cart/cart.service';
import { EventBusService } from '../../core/event-bus/event-bus.service';

import { CartProductModel } from '../../models/cart-product.model';

const sharredOptions = {
    header: true,
    footer: true
};

@Component({
    selector: 'app-order',
    styleUrls: ['./order.component.scss'],
    templateUrl: './order.component.html'
})

export class OrderComponent {

    public orderPage = '';

    constructor(
        private router: Router,
        private cartService: CartService,
        private eventBusService: EventBusService
    ) {
        this.setDynamicPages();
    };

    private setDynamicPages() {
        this.router.events.forEach((event: NavigationEvent) => {
            if ((event instanceof NavigationEnd) && (event.url.includes('order'))) {
                console.log('route change detected');
                let splitted = event.url.split('/');
                this.orderPage = splitted[splitted.indexOf('order') + 1];
                //  TODO : Check the ID and show the user that is processed!!!
            }
        });
    }
}
