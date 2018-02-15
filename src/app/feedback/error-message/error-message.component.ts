import { Component, Input } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations'

import { BackendService } from '../../core/backend/backend.service';
import { EventBusService } from '../../core/event-bus/event-bus.service';

declare var $: any;

@Component({
	selector: 'app-error-message',
	animations: [
		trigger('errorWindowSlide', [
			transition(':enter', [
				style({ transform: 'translateY(100%)' }),
				animate('300ms', style({ transform: 'translateY(0)' }))
			]),
			transition(':leave', [
				style({ transform: 'translateY(0)' }),
				animate('300ms', style({ transform: 'translateY(100%)' }))
			])
		]),
		trigger('fadeInThanks', [
			transition(':enter', [
				style({ opacity: 0 }),
				animate('500ms', style({ opacity: 1 }))
			])
		]),
		trigger('expandForm', [
			transition(':enter', [
				style({ height: 0, margin: 0 }),
				animate('300ms', style({ height: '*', margin: '*' }))
			])
		]),
		trigger('moveToHideRetry', [
			transition(':leave', [
				style({ height: '*', opacity: 0, margin: '*', padding: '*' }),
				animate('300ms', style({ height: 0, margin: 0, padding: 0 }))
			])
		])
	],
	templateUrl: './error-message.component.html',
	styleUrls: ['./error-message.component.scss']
})

export class ErrorMessageComponent {
	private retryCountMaxInterval = 10000;

	@Input() type: string = 'alert';
	@Input() customError: string = '';
	showErrorMessage = false;
	errorMessage = '';

	constructor(
		private backendService: BackendService,
		private eventBusService: EventBusService
	) {
		this.eventBusService.requestError.subscribe((data) => this.showError(data));
	}

	showError(data) {
		this.errorMessage = data.errorMessage;
		this.showErrorMessage = true;
	}

	hideError() {
		this.showErrorMessage = false;
	}
}
