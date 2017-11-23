import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FetcherService } from '../../services/fetcher.service';
import { Dictionary } from '../../dictionary/dictionary.service';
import { CategoriesService } from '../../services/categories.service';
import { EventEmiterService } from '../../services/event.emiter.service';
import { ErrorHandlerService } from '../../services/error.handler.service';

@Component({
    selector: 'navigation',
    styleUrls: ['./navigation.component.css'],
    templateUrl: './navigation.component.html'
})

export class NavigationComponent {

    public categories: Array<Object> = [];
    public categoriesClone: Array<Object> = [];
    public navItems: Array<Object> = [];

    constructor(
        public router: Router,
        public dictionary: Dictionary,
        public authService: AuthService,
        public fetcherService: FetcherService,
        public categoriesService: CategoriesService,
        public eventEmiterService: EventEmiterService,
        public errorHandlerService: ErrorHandlerService
    ) {
        this.categories = categoriesService.getCategories();
        this.categoriesClone = JSON.parse(JSON.stringify(this.categories));
        this.eventEmiterService.dataFetched.subscribe(data => this.onFetchedData(data));
    };    
    
    public onFetchedData(data) {
        this.categories = data.categories;
        this.categoriesClone = JSON.parse(JSON.stringify(data.categories));
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
        this.fetcherService.updateCategories({
            categories: array,
            loginData: this.authService.getLoginData()
        }).subscribe(
            data => this.success(data.json()),
            err => this.errorHandlerService.handleError(err)
        );
    }

    public removeLastChange() {
        this.categoriesClone.push(this.navItems[this.navItems.length - 1]);
        this.navItems.pop();
    }

    public success(data) {

    }
}
