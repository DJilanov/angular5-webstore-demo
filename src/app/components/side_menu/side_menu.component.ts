import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
    selector: 'side-menu',
    styleUrls: ['./side_menu.component.css'],
    templateUrl: './side_menu.component.html'
})

export class SideMenuComponent implements OnInit {
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
