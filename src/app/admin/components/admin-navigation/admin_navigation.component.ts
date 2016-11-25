import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Dictionary } from '../../../dictionary/dictionary.service';
import { EventEmiterService } from '../../../services/event.emiter.service';

@Component({
    selector: 'admin-navigation',
    styleUrls: ['./admin_navigation.component.css'],
    templateUrl: './admin_navigation.component.html'
})

export class AdminNavigationComponent {

    private categories: Array<Object> = [];

    constructor(
        private router: Router,
        private dictionary: Dictionary,
        private eventEmiterService: EventEmiterService
    ) {
      this.eventEmiterService.dataFetched.subscribe(data => this.onFetchedData(data));
    };    
    
    private onFetchedData(data) {
      this.categories = data.categories;
    }
}
