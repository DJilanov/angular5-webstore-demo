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
        debugger;
        this.fetcherService.createCategories({
            categories: [category],
            loginData: this.authService.getLoginData()
        }).subscribe(
            data => this.successUpdate(data.json(), 'create'),
            err => this.errorHandlerService.handleError(err)
        );
    }

    private edit(category) {
        debugger;
        this.fetcherService.updateCategories({
            categories: [category],
            loginData: this.authService.getLoginData()
        }).subscribe(
            data => this.successUpdate(data.json(), 'update'),
            err => this.errorHandlerService.handleError(err)
        );
    }

    private delete(category) {
        debugger;
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
        debugger;
        if(action == 'create') {
            // this.productsService.addProduct(data.response);
        } else if(action == 'delete') {
            // this.productsService.removeProduct(data.response['_id']);
        }
    }
}
