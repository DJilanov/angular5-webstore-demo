import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { BackendService } from './backend/backend.service';
import { ErrorHandlerService } from './error-handler/error-handler.service';
import { EventBusService } from './event-bus/event-bus.service';

import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
	imports: [
		HttpModule,
		CommonModule,
	],
	providers: [
		BackendService,
		EventBusService,
		ErrorHandlerService
	]
})
export class CoreModule { }
