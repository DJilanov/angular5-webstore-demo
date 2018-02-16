import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EventBusService } from '../../core/event-bus/event-bus.service';

import { environment } from 'environments/environment';

@Component({
    selector: 'contact',
    styleUrls: ['./contact.component.scss'],
    templateUrl: './contact.component.html'
})

export class ContactComponent {

    public phoneNumbers = [ '0878422063', '0878613400' ];
    public lat = environment.mapCoordinates.lat;
    public lng = environment.mapCoordinates.lng;
    public zoom = environment.mapCoordinates.zoom;

    public messageSuccess: boolean;
    public messageFail: boolean;

    constructor(
        private router: Router,
        private eventBusService: EventBusService
    ) {

    };
    
    ngOnInit() {
		this.eventBusService.emitTranslate({});
    }
}
