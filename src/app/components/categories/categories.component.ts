import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FetcherService } from '../../services/fetcher.service';
import { Dictionary } from '../../dictionary/dictionary.service';
import { CategoriesService } from '../../services/categories.service';
import { EventEmiterService } from '../../services/event.emiter.service';
import { ErrorHandlerService } from '../../services/error.handler.service';

@Component({
    selector: 'categories',
    styleUrls: ['./categories.component.css'],
    templateUrl: './categories.component.html'
})

export class CategoriesComponent {

    public categories: Array<Object>;

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
      // on categories update we update the local array
      this.eventEmiterService.dataFetched.subscribe(data => this.onFetchedData(data));
    };    
    
    public onFetchedData(data) {
      this.categories = data.categories;
    }

    public addCategory() {
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

    public create(category) {
        this.fetcherService.createCategories({
            category: category,
            loginData: this.authService.getLoginData()
        }).subscribe(
            data => this.successUpdate(data.json(), 'create'),
            err => this.errorHandlerService.handleError(err)
        );
    }

    public update(category) {
        this.fetcherService.updateCategories({
            categories: [category],
            loginData: this.authService.getLoginData()
        }).subscribe(
            data => this.successUpdate(data.json(), 'update'),
            err => this.errorHandlerService.handleError(err)
        );
    }

    public delete(category) {
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

    public successUpdate(data, action) {
        if(action == 'create') {
            for(let categoriesCounter = 0; categoriesCounter < this.categories.length; categoriesCounter++) {
                if(this.categories[categoriesCounter]['products'] == data.response.products) {
                    this.categories[categoriesCounter]['new'] = false;
                }
            }
        } else if(action == 'delete') {
             for(let categoriesCounter = 0; categoriesCounter < this.categories.length; categoriesCounter++) {
                if(this.categories[categoriesCounter]['products'] == data.response.products) {
                    this.categories.splice(categoriesCounter, 1);
                    this.categoriesService.removeCategory(data.response['_id']);
                }
            }
        }
    }
}
