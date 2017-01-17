import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

//import { DateComponent } from '../date/date.component';

@Component({
    selector: 'page-not-found',
    styleUrls: ['./page_not_found.component.css'],
    templateUrl: './page_not_found.component.html'
})

export class PageNotFoundComponent implements OnInit {
    @Input()
    postOptions: Object;
    /**
     * @constructor We init the view with the router
     */
    constructor(private router: Router) {}
    /**
     * @ngOnInit on init
     */
    public ngOnInit() {
        this.checkForSimilarRouter();
    }
    public checkForSimilarRouter() {
        var path = '';
        var navigateTo = '';
        var currentUrl = this.router.url.toLowerCase().split('/')[1];
        // we split it into many 2 chars strings
        var partsOfUrl = currentUrl.match(/.{1,2}/g);
        var partsEquals = new Array(partsOfUrl.length);
        // we check for all routes we predeclare
        for(var routeCounter = 0; routeCounter < this.router.config.length; routeCounter++) {
            partsEquals.fill(undefined);
            path = this.router.config[routeCounter].path;
            // we check for each part of the url we typed is part of it
            for(var chunksCounter = 0; chunksCounter < partsEquals.length; chunksCounter++) {
                // if the part of the url is here we make it true
                if(path.indexOf(partsOfUrl[chunksCounter]) !== -1) {
                    partsEquals[chunksCounter] = true;
                }
            }
            // check did we find the path that we must go to
            partsEquals.sort();
            if((partsEquals.indexOf(undefined) > partsEquals.length * 1 / 2) || (partsEquals.indexOf(undefined) == -1)) {
                let url = '/';
                if(this.router.url.split('/')[2] !== undefined) {
                    if(path.split(':')[1] !== undefined) {
                        url += path.split(':')[0];
                        url += this.router.url.split('/')[2];
                    }
                } else {
                    url += path;
                }
                this.router.navigate([url]);
                break;
            }
        }
    }
}
