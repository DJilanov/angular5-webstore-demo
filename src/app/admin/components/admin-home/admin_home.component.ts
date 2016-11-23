import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Dictionary } from '../../../dictionary/dictionary.service';

@Component({
    selector: 'admin-home',
    styleUrls: ['./admin_home.component.css'],
    templateUrl: './admin_home.component.html'
})

export class AdminHomeComponent {

    constructor(
        private router: Router,
        private dictionary: Dictionary
    ) {};
}
