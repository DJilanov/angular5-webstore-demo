import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EventBusService } from '../../core/event-bus/event-bus.service';
import { CategoriesService } from '../../services/categories/categories.service';
import { TranslateService } from '../../shared/translation/services/translate.service';

import { CategoryModel } from '../../models/category.model';

const sharredOptions = {};

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

	public language: string;
	public activeTab: string = 'home';
	public categories: CategoryModel[];

	constructor(
        private router: Router,
		private eventBusService: EventBusService,
		private translateService: TranslateService,
		private categoriesService: CategoriesService
	) {
		this.eventBusService.changeRoute.subscribe(
			(tab) => this.makeActiveTab(tab.replace('/', ''))
		);

		this.eventBusService.categoriesUpdate.subscribe(() => {
			this.categories = this.categoriesService.getCategories();
		});

		let params = this.router.url.split('/');
		if(this.router.url.length > 1) {
			this.activeTab = params[params.length - 1];
		}
		this.categories = this.categoriesService.getCategories();
		this.language = this.translateService.getLanguage();
	}
    
    ngOnInit() {
		this.eventBusService.emitTranslate({});
    }

	makeActiveTab(tab) {
		this.activeTab = tab;
	}
}
