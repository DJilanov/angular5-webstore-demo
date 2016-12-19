import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { Dictionary } from '../../dictionary/dictionary.service';
import { EventEmiterService } from '../../services/event.emiter.service';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'custom-header',
    styleUrls: ['./header.component.css'],
    templateUrl: './header.component.html'
})

export class HeaderComponent {

    private categories:Array<Object>;

    constructor(
        private router: Router,
        private dictionary: Dictionary,
        private categoriesService: CategoriesService,
        private eventEmiterService: EventEmiterService
    ) {
      this.categories = categoriesService.getCategories();
      this.updateCategoriesIndex();
      // on categories update we update the local array
      this.eventEmiterService.dataFetched.subscribe(data => this.onFetchedData(data));
    };

    private onFetchedData(data) {
      this.categories = data.categories;
      this.updateCategoriesIndex();
    }

    private changeLanguage() {
      this.dictionary.changeLanguage();
    }

    private updateCategoriesIndex(){
      let array = [];
      for(let categoriesCounter = 0; categoriesCounter < this.categories.length; categoriesCounter++) {
        array[+this.categories[categoriesCounter]['zIndex']] = this.categories[categoriesCounter];
      }
      this.categories = array.filter(function(n){ return n != undefined });
    }
}
