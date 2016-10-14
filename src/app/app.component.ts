import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    constructor(
        private router: Router
    ) {};

    private showLogScreen: Boolean = true;

    public logOutBtnClick() {
        this.showLogScreen = true;
    }

    public logIn() {
        this.showLogScreen = false;
    }

    public showLogInScreen() {
        var token = localStorage.getItem('/access_token');
        // check does it exist
        if(token) {
            // check is it full
            if((this.showLogScreen) && (token.length < 5)) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
    /**
    * @ngOnInit on init
    */
    public ngOnInit() {}
}
