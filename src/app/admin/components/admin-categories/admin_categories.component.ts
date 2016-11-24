import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Dictionary } from '../../../dictionary/dictionary.service';
import { CategoriesService } from '../../../services/categories.service';
import { EventEmiterService } from '../../../services/event.emiter.service';

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
        private categoriesService: CategoriesService,
        private eventEmiterService: EventEmiterService
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
}
