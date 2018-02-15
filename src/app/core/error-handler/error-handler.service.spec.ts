/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
	Http, HttpModule
} from '@angular/http';

import { ErrorHandlerService } from './error-handler.service';
import { EventBusService } from '../event-bus/event-bus.service';

describe('ErrorHandlerService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			providers: [
				EventBusService,
				ErrorHandlerService
			]
		});
	});

	it('should be inited correctly', inject([ErrorHandlerService], (service: ErrorHandlerService) => {
		expect(service).toBeTruthy();
	}));
	
	it('should return correct error when the server is not opening request', inject([ErrorHandlerService], (service: ErrorHandlerService) => {
		expect(service.handleRequestError({
			ok: false,
			status: 0,
			json: function () {
				return {
					type: 'error'
				}
			}
		})).toContain('Cannot connect to the server');
	}));

	it('should return correct error when the server is returning strange request', inject([ErrorHandlerService], (service: ErrorHandlerService) => {
		expect(service.handleRequestError('test')).toContain('test');
	}));

	it('should return correct error when the server is returning correctly', inject([ErrorHandlerService], (service: ErrorHandlerService) => {
		expect(service.handleRequestError({
			ok: false,
			status: 200,
			json: function () {
				return {
					type: 'success',
					Message: 'test'
				}
			}
		})).toContain('test');
	}));
});
