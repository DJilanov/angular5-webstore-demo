import { Component } from '@angular/core';

import { EventBusService } from '../../core/event-bus/event-bus.service';
import { CategoriesService } from '../../services/categories/categories.service';
import { TranslateService } from '../../shared/translation/services/translate.service';

import { CategoryModel } from '../../services/categories/category.model';

const sharredOptions = {};

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

	public language: string;
	public activeTab: string;
	public categories: CategoryModel[];

	constructor(
		private eventBusService: EventBusService,
		private translateService: TranslateService,
		private categoriesService: CategoriesService
	) {
		this.eventBusService.changeRoute.subscribe(
			(tab) => this.makeActiveTab(tab.replace('/', '').split('#')[0])
		);

		this.eventBusService.categoriesUpdate.subscribe(() => {
			this.categories = this.categoriesService.getCategories();
		});

		this.language = this.translateService.getLanguage();
	}

	makeActiveTab(tab) {
		this.activeTab = tab;
	}
}
