import { Directive, ElementRef } from "@angular/core";
import { TranslateService } from "../services/translate.service";

import { EventBusService } from '../../../core/event-bus/event-bus.service';

@Directive({
    selector: '[translate]'
})
export class TranslateDirective {
    constructor(
        public element: ElementRef,
        public eventBusService: EventBusService,
        public translateService: TranslateService
    ) {
		this.eventBusService.translate.subscribe(
			() => this.handleOnLanguageChange()
		);
		this.eventBusService.changeLanguage.subscribe(
			() => this.handleOnLanguageChange()
        );
        this.handleOnLanguageChange();
    }

    private handleOnLanguageChange() {
        if(this.element.nativeElement.tagName == 'INPUT') {
            this.element.nativeElement.placeholder = this.translateService.translate(this.element.nativeElement.placeholder);
        } else {
            this.element.nativeElement.textContent = this.translateService.translate(this.element.nativeElement.textContent);
        }
    }
}