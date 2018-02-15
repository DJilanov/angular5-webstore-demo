import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { BackendService } from '../../core/backend/backend.service';
import { EventBusService } from '../../core/event-bus/event-bus.service';
import { ErrorHandlerService } from '../../core/error-handler/error-handler.service';

import { AuthService } from '../../services/auth/auth.service';
import { UtilsService } from '../../services/utils/utils.service';
import { CategoriesService } from '../../services/categories/categories.service';

import { CategoryModel } from '../../services/categories/category.model';

const sharredOptions = {
	header: true,
	footer: true
};

@Component({
    selector: 'navigation',
    styleUrls: ['./navigation.component.scss'],
    templateUrl: './navigation.component.html'
})

export class NavigationComponent {

    public categories: Array<CategoryModel>;
    public categoriesClone: Array<CategoryModel>;
    public navItems: Array<CategoryModel>;

    constructor(
        public router: Router,
        public authService: AuthService,
        public utilsService: UtilsService,
        public backendService: BackendService,
        public eventBusService: EventBusService,
        public categoriesService: CategoriesService,
        public errorHandlerService: ErrorHandlerService
    ) {
        this.categories = categoriesService.getCategories();
        this.categoriesClone = this.utilsService.cloneObject(this.categories);
        this.eventBusService.emitChangeSharedOptions(sharredOptions);
        this.eventBusService.categoriesUpdate.subscribe(categories => this.onCategoriesUpdate(categories));
    };    
    
    public onCategoriesUpdate(eventData) {
        this.categories = eventData.categories;
        this.categoriesClone = this.utilsService.cloneObject(this.categories);
    }

    public onCategoryDrop(element) {
        for(var categoryCounter = 0; categoryCounter < this.categoriesClone.length; categoryCounter++) {
            if(element.dragData._id == this.categoriesClone[categoryCounter]['_id']) {
                this.categoriesClone.splice(categoryCounter, 1);
                break;
            }
        }
        this.navItems.push(element.dragData);
    }

    public refreshPositioning() {
        this.navItems.length = 0;
        this.categoriesClone = JSON.parse(JSON.stringify(this.categories));
    }

    public saveNewPositioning() {
        var array = [];
        for(var categoryCounter = 0; categoryCounter < this.navItems.length; categoryCounter++) {
            array[array.length] = this.navItems[categoryCounter];
            array[array.length - 1]['shownOnNav'] = "true";
            array[array.length - 1]['zIndex'] = array.length - 1;
        }
        for(var categoryCounter = 0; categoryCounter < this.categoriesClone.length; categoryCounter++) {
            array[array.length] = this.categoriesClone[categoryCounter];
            array[array.length - 1]['shownOnNav'] = "false";
            array[array.length - 1]['zIndex'] = array.length - 1;
        }
        this.backendService.updateCategories({
            categories: array,
            loginData: this.authService.getLoginData()
        }).subscribe(
            data => this.success(data.json()),
            err => this.errorHandlerService.handleRequestError(err)
        );
    }

    public removeLastChange() {
        this.categoriesClone.push(this.navItems[this.navItems.length - 1]);
        this.navItems.pop();
    }

    public success(data) {

    }
}
