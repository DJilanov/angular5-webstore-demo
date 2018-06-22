import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-steps',
    styleUrls: ['./steps.component.scss'],
    templateUrl: './steps.component.html'
})

export class StepsComponent {
    @Input('steps') set stepsSetter(c: number) {
        this.stepsArrayMock = [];
        for (let i = 1; i <= c; i++) {
            this.stepsArrayMock.push(i);
        }
    }
    @Input() activeStep: number = 0;

    public stepsArrayMock: number[] = [];
}
