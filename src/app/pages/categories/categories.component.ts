import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { UtilsService } from '../../services/utils/utils.service';
import { BackendService } from '../../core/backend/backend.service';
import { EventBusService } from '../../core/event-bus/event-bus.service';
import { ErrorHandlerService } from '../../core/error-handler/error-handler.service';
import { TranslateService } from '../../shared/translation/services/translate.service';

import { AuthService } from '../../services/auth/auth.service';
import { CategoriesService } from '../../services/categories/categories.service';

import { SearchModel } from './category.search.model';
import { CategoryModel } from '../../services/categories/category.model';

const sharredOptions = {
	header: true,
	footer: true
};

@Component({
    selector: 'categories',
    styleUrls: ['./categories.component.scss'],
    templateUrl: './categories.component.html'
})

export class CategoriesComponent {

    public categories: Array<CategoryModel>;
    public searchData: SearchModel = new SearchModel;

    constructor(
        private router: Router,
        private authService: AuthService,
        private utilsService: UtilsService,
        private backendService: BackendService,
        private translateService: TranslateService,
        private categoriesService: CategoriesService,
        private eventBusService: EventBusService,
        private errorHandlerService: ErrorHandlerService
    ) {
      this.categories = this.categoriesService.getCategories();
      this.eventBusService.emitChangeSharedOptions(sharredOptions);
      this.eventBusService.categoriesUpdate.subscribe(categories => this.updateCategories(categories));
    };    
    
    public updateCategories(eventData) {
      this.categories = eventData.categories;
    }
    
    public getLanguage() {
      return this.translateService.getLanguage();
    }

    public filterCategories(eventData) {
        this.searchData[eventData.target.name] = eventData.target.value;
        this.categories = this.utilsService.cloneObject(this.categoriesService.getCategories());

        for(let param in this.searchData) {
            if(this.searchData[param] && this.searchData[param].length) {
                this.categories = this.categories.filter((category) => {
                    if(category[param]) {
                        if(typeof category[param] === 'object') {
                            return category[param][this.getLanguage()].toString().toLowerCase().includes(this.searchData[param].toString().toLowerCase());
                        } else {
                            return category[param].toString().toLowerCase().includes(this.searchData[param].toString().toLowerCase());
                        }
                    }
                });
            }
        }
    }
    
    public create() {
        this.router.navigate(['/category/']);
    }

    public edit(category) {
        this.router.navigate(['/category/' + category.id]);
    }
}
