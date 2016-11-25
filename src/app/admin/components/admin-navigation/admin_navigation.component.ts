import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FetcherService } from '../../../services/fetcher.service';
import { Dictionary } from '../../../dictionary/dictionary.service';
import { CategoriesService } from '../../../services/categories.service';
import { EventEmiterService } from '../../../services/event.emiter.service';
import { ErrorHandlerService } from '../../../services/error.handler.service';

@Component({
    selector: 'admin-navigation',
    styleUrls: ['./admin_navigation.component.css'],
    templateUrl: './admin_navigation.component.html'
})

export class AdminNavigationComponent {

    private categories: Array<Object> = [];
    private categoriesClone: Array<Object> = [];
    private navItems: Array<Object> = [];

    constructor(
        private router: Router,
        private dictionary: Dictionary,
        private authService: AuthService,
        private fetcherService: FetcherService,
        private categoriesService: CategoriesService,
        private eventEmiterService: EventEmiterService,
        private errorHandlerService: ErrorHandlerService
    ) {
        this.categories = categoriesService.getCategories();
        this.categoriesClone = JSON.parse(JSON.stringify(this.categories));
        this.eventEmiterService.dataFetched.subscribe(data => this.onFetchedData(data));
    };    
    
    private onFetchedData(data) {
        this.categories = data.categories;
        this.categoriesClone = JSON.parse(JSON.stringify(data.categories));
    }

    private onCategoryDrop(element) {
        for(var categoryCounter = 0; categoryCounter < this.categoriesClone.length; categoryCounter++) {
            if(element.dragData._id == this.categoriesClone[categoryCounter]['_id']) {
                this.categoriesClone.splice(categoryCounter, 1);
                break;
            }
        }
        this.navItems.push(element.dragData);
    }

    private refreshPositioning() {
        this.navItems.length = 0;
        this.categoriesClone = JSON.parse(JSON.stringify(this.categories));
    }

    private saveNewPositioning() {
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
        this.fetcherService.updateCategories({
            categories: array,
            loginData: this.authService.getLoginData()
        }).subscribe(
            data => this.success(data.json()),
            err => this.errorHandlerService.handleError(err)
        );
    }

    private success(data) {

    }
}
