import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

// import { DateComponent } from '../date/date.component';

@Component({
    selector: 'custom-button',
    styleUrls: ['./button.component.css'],
    templateUrl: './button.component.html'
})

export class ButtonComponent implements OnInit {
    
    @Input()
    buttonOptions;
    /**
     * @ngOnInit on init
     */
    public ngOnInit() {

    }
}
