import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { BackendService } from '../../core/backend/backend.service';
import { EventBusService } from '../../core/event-bus/event-bus.service';
import { TranslateService } from '../../shared/translation/services/translate.service';
import { ErrorHandlerService } from '../../core/error-handler/error-handler.service';

import { AuthService } from '../../services/auth/auth.service';
import { CategoriesService } from '../../services/categories/categories.service';

import { CategoryModel } from '../../services/categories/category.model';

const sharredOptions = {
	header: true,
	footer: true
};

@Component({
    selector: 'category-edit',
    styleUrls: ['./category-edit.component.scss'],
    templateUrl: './category-edit.component.html'
})

export class CategoryEditComponent {

    public category: CategoryModel;

    constructor(
        private router: Router,
        private authService: AuthService,
        private backendService: BackendService,
        private eventBusService: EventBusService,
        private translateService: TranslateService,
        private categoriesService: CategoriesService,
        private errorHandlerService: ErrorHandlerService
    ) {
        // TODO: update by the root params
        // this.category;
        this.eventBusService.emitChangeSharedOptions(sharredOptions);
        this.eventBusService.categoriesUpdate.subscribe(() => this.updateCategories());
        
        let routes = this.router.url.split('/');
        this.updateCategory(routes[routes.length - 1]);
    }

    public updateCategory(id) {
        this.categoriesService.getCategoryById(id) || new CategoryModel();
    }

    private updateCategories() {
        this.router.navigate(['/categories']);
    }
    
    public getLanguage() {
        return this.translateService.getLanguage();
    }

    public deleteCategory() {
        let loginData = this.authService.getLoginData();
        let request = Object.assign(
            {
                category: this.category,
                username: loginData['username'],
                password: loginData['password']
            }, {
                'type': 'delete'
            }
        );
        this.backendService.updateCategories(request).subscribe(
            response => this.eventBusService.emitCategoriesUpdate(response),
            err => this.errorHandlerService.handleRequestError(err)
        );
    }

    public saveCategory() {
        let loginData = this.authService.getLoginData();
        let request = {
            category: this.category,
            username: loginData['username'],
            password: loginData['password']
        };
        if(this.category.id) {
            request = Object.assign(request, {'type': 'update'});
        } else {
            request = Object.assign(request, {'type': 'create'});
        }
        this.backendService.updateCategories(request).subscribe(
            response => this.eventBusService.emitCategoriesUpdate(response),
            err => this.errorHandlerService.handleRequestError(err)
        );
    }
}
