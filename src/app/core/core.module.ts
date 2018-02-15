import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackendService } from './backend/backend.service';
import { ErrorHandlerService } from './error-handler/error-handler.service';
import { EventBusService } from './event-bus/event-bus.service';

import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
	imports: [
		CommonModule
	],
	providers: [
		BackendService,
		EventBusService,
		ErrorHandlerService
	]
})
export class CoreModule {
	constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
		throwIfAlreadyLoaded(parentModule, 'CoreModule');
	}
}
