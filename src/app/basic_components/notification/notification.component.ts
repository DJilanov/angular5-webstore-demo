import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'notification',
    styleUrls: ['./notification.component.css'],
    templateUrl: './notification.component.html'
})

export class NotificationComponent implements OnInit {
    @Input()
    postOptions: Object;

    @Output()
    cPayChanged = new EventEmitter();

    private showOverlay = false;

    /**
     * @ngOnInit on init
     */
    public ngOnInit() {

    }
}
