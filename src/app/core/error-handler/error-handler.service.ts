import { Injectable } from '@angular/core';

import { EventBusService } from '../event-bus/event-bus.service';

const cannotConnect = 'Cannot connect to the server';
const noInternet = 'There is no internet connection to the server';

@Injectable()
export class ErrorHandlerService {
	constructor(
		private eventBusService: EventBusService
	) { 

	}

	handleRequestError(error) {
		let errorMessage = '';
		if (error.status == 0) {
			errorMessage = noInternet;
		} else if (error.status) {
			errorMessage = error.json().Message || error.json().error || cannotConnect;
		} else {
			errorMessage = error;
		}
		this.eventBusService.emitRequestError({
			errorMessage: errorMessage
		});
	}
}
