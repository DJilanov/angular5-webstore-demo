import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';
import { Language } from '../../language/language.service';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'custom-header',
    styleUrls: ['./header.component.css'],
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

    @Output()
    logOutBtnClick = new EventEmitter();

    private categories = Array<Object>();

    constructor(
        private language: Language,
        private categoriesService: CategoriesService,
        private router: Router
    ) {
      this.categories = categoriesService.getCategories();
      // on categories update we update the local array
      this.categoriesService.categoriesUpdate.subscribe(categories => this.onCategoriesUpdate(categories));
    };

    private onCategoriesUpdate(categories) {
      this.categories = categories;
    }

    private changeLanguage() {
      this.language.changeLanguage();
    }

    /**
     * @ngOnInit on init
     */
    public ngOnInit() {
        
    }
}
