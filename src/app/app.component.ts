import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';

import { BackendService } from './core/backend/backend.service';
import { EventBusService } from './core/event-bus/event-bus.service';
import { ErrorHandlerService } from './core/error-handler/error-handler.service';

import { ProductsService } from './services/products/products.service';
import { CategoriesService } from './services/categories/categories.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ]
})

export class AppComponent {

    public loading: boolean = true;

    constructor(
        private router: Router,
        private backendService: BackendService,
        private eventBusService: EventBusService,
        private productsService: ProductsService,
        private categoriesService: CategoriesService,
        private errorHandlerService: ErrorHandlerService
    ) {
		this.router.events.subscribe(
			(event) => {
				if(event instanceof NavigationStart) {
					this.eventBusService.emitChangeRoute(event.url);
				}
			}
        );
        this.eventBusService.productsUpdate.subscribe(() => {
            if(this.loading) {
                this.loading = false;
            }
        })
        this.getData();
    };
    
    private getData() {
        this.backendService.getProducts().subscribe(
            data => this.productsService.setProducts(data.json()),
            err => this.errorHandlerService.handleRequestError(err)
        );
        this.backendService.getCategories().subscribe(
            data => this.categoriesService.setCategories(data.json()),
            err => this.errorHandlerService.handleRequestError(err)
        );
    }
}
