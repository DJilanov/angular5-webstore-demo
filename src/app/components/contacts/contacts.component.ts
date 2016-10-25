import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Language } from '../../language/language.service';

import { Config } from '../../config';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'contacts',
    styleUrls: ['./contacts.component.css'],
    templateUrl: './contacts.component.html'
})

export class ContactsComponent {

    private mapCoordinates = Config.mapCoordinates;

    constructor(
        private language: Language
    ) {}
}
