import { Component } from '@angular/core';

import { EventBusService } from '../../core/event-bus/event-bus.service';

const sharredOptions = {};

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

	search = false;
	activeTab = 'messages';

	constructor(
		private eventBusService: EventBusService,
	) {
		this.eventBusService.changeRoute.subscribe(
			(tab) => this.makeActiveTab(tab.replace('/', '').split('#')[0])
		);
	}

	updateSharedOptions(options) {
		this.search = options.search || false;
	}

	makeActiveTab(tab) {
		this.activeTab = tab;
	}
}
