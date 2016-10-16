import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FetcherService } from './services/fetcher.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    private products: Array<Object>;
    private categories: Array<Object>;

    constructor(
        private router: Router,
        private fetcher: FetcherService
    ) {
        fetcher.getProducts().subscribe(result => this.products = result.json());
        fetcher.getCategories().subscribe(result => this.categories = result.json());
    };

    public ngOnInit() {}
}
