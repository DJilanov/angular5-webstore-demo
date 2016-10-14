import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import {LocalStorage, SessionStorage} from "angular2-localstorage/WebStorage";
import { Router } from '@angular/router';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'custom-header',
    styleUrls: ['./header.component.css'],
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

    @LocalStorage() public access_token:String;

    @Output()
    logOutBtnClick = new EventEmitter();

    constructor(
        private router: Router
    ) {};

    private importButton = {
        class: 'green white-font',
        hasIcon: true,
        radius: true,
        text: 'IMPORT DS'
    };

    private createorderButton = {
        class: '',
        hasIcon: true,
        iconClass: 'glyphicon-flash',
        radius: true,
        text: 'CREATE ORDER'
    };

    private logoutButton = {
        class: 'pull-right',
        hasIcon: false,
        radius: false,
        text: 'Log Out'
    };

    public logOut() {
        localStorage.setItem('/access_token','');
        this.router.navigate(['/']);
        this.logOutBtnClick.emit();
    }

    public showLogOutBtn() {
        // return this.access_token.length > 5;
        if(localStorage.getItem('/access_token')) {
            return localStorage.getItem('/access_token').length > 5;
        }
    }

    /**
     * @ngOnInit on init
     */
    public ngOnInit() {
        
    }
}
