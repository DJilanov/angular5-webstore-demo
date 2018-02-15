import { Component, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BackendService } from '../../core/backend/backend.service';
import { EventBusService } from '../../core/event-bus/event-bus.service';
import { TranslateService } from '../../shared/translation/services/translate.service';
import { ErrorHandlerService } from '../../core/error-handler/error-handler.service';

import { AuthService } from '../../services/auth/auth.service';
import { UtilsService } from '../../services/utils/utils.service';
import { ProductsService } from '../../services/products/products.service';
import { CategoriesService } from '../../services/categories/categories.service';

import { ProductModel } from '../../services/products/product.model';
import { CategoryModel } from '../../services/categories/category.model';

const sharredOptions = {
	header: true,
	footer: true
};

@Component({
    selector: 'product-edit',
    styleUrls: ['./product-edit.component.scss'],
    templateUrl: './product-edit.component.html'
})

export class ProductEditComponent {

    public product: ProductModel;
    public categories: Array<CategoryModel>;

    constructor(
        private router: Router,
        private authService: AuthService,
        private backendService: BackendService,
        private activatedRoute: ActivatedRoute,
        private productsService: ProductsService,
        private eventBusService: EventBusService,
        private translateService: TranslateService,
        private categoriesService: CategoriesService,
        private errorHandlerService: ErrorHandlerService,
    ) {
        // TODO: get the product id from the route and get it from the product service based on the id
        // this.product = productsService.getProducts();
        this.categories = this.categoriesService.getCategories();
        this.eventBusService.productsUpdate.subscribe(data => this.productUpdated(data));

        let routes = this.router.url.split('/');
        this.updateProduct(routes[routes.length - 1]);
    };

    private updateProduct(id) {
      this.product = this.productsService.getProductById(id) || new ProductModel();
    }

    private productUpdated(product) {
        this.router.navigate(['/products']);
    }
    
    public getLanguage() {
        return this.translateService.getLanguage();
    }

    public deleteProduct() {
        let loginData = this.authService.getLoginData();
        let request = Object.assign(
            {
                product: this.product,
                username: loginData['username'],
                password: loginData['password']
            }, {
                'type': 'delete'
            }
        );
        this.backendService.updateProduct(request).subscribe(
            response => this.eventBusService.emitProductsUpdate(response),
            err => this.errorHandlerService.handleRequestError(err)
        );
    }

    public saveProduct() {
        let loginData = this.authService.getLoginData();
        let request = {
            product: this.product,
            username: loginData['username'],
            password: loginData['password']
        };
        if(this.product.id) {
            request = Object.assign(request, {'type': 'update'});
        } else {
            request = Object.assign(request, {'type': 'create'});
        }
        this.backendService.updateProduct(request).subscribe(
            response => this.eventBusService.emitProductsUpdate(response),
            err => this.errorHandlerService.handleRequestError(err)
        );
    }
}
