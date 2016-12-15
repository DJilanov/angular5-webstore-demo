import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FetcherService } from '../../../services/fetcher.service';
import { Dictionary } from '../../../dictionary/dictionary.service';
import { CategoriesService } from '../../../services/categories.service';
import { EventEmiterService } from '../../../services/event.emiter.service';
import { ErrorHandlerService } from '../../../services/error.handler.service';

@Component({
    selector: 'admin-categories',
    styleUrls: ['./admin_categories.component.css'],
    templateUrl: './admin_categories.component.html'
})

export class AdminCategoriesComponent {

    private categories: Array<Object>;

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
      // on categories update we update the local array
      this.eventEmiterService.dataFetched.subscribe(data => this.onFetchedData(data));
    };    
    
    private onFetchedData(data) {
      this.categories = data.categories;
    }

    private addCategory() {
      this.categories[this.categories.length] = {
          "title": {
              "bg": "",
              "en": ""
          },
          "name": {
              "bg": "",
              "en": ""
          },
          "products": "",
          "zIndex": "4",
          "shownOnNav": "true",
          "link": "",
          "new": true
      }
    }

    private create(category) {
        this.fetcherService.createCategories({
            category: category,
            loginData: this.authService.getLoginData()
        }).subscribe(
            data => this.successUpdate(data.json(), 'create'),
            err => this.errorHandlerService.handleError(err)
        );
    }

    private update(category) {
        this.fetcherService.updateCategories({
            categories: [category],
            loginData: this.authService.getLoginData()
        }).subscribe(
            data => this.successUpdate(data.json(), 'update'),
            err => this.errorHandlerService.handleError(err)
        );
    }

    private delete(category) {
        let loginData = this.authService.getLoginData();
        this.fetcherService.deleteCategory({
            category: category,
            username: loginData['username'],
            password: loginData['password']
        }).subscribe(
            data => this.successUpdate(data.json(), 'delete'),
            err => this.errorHandlerService.handleError(err)
        );
    }

    private successUpdate(data, action) {
        if(action == 'create') {
            for(let categoriesCounter = 0; categoriesCounter < this.categories.length; categoriesCounter++) {
                if(this.categories[categoriesCounter]['products'] == data.response.products) {
                    this.categories[categoriesCounter]['.new'] = false;
                    this.categoriesService.addCategory(data.response);
                }
            }
        } else if(action == 'delete') {
             for(let categoriesCounter = 0; categoriesCounter < this.categories.length; categoriesCounter++) {
                if(this.categories[categoriesCounter]['products'] == data.response.products) {
                    this.categories.splice(categoriesCounter, 1);
                    this.categoriesService.removeCategory(data.response['_id']);
                }
            }
        } else if(action == 'update') {
             this.categoriesService.updateCategory(data.response['_id']);
        }
    }
}
