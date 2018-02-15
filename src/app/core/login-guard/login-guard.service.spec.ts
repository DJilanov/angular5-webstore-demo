/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';

import { LoginGuard } from './login-guard.service';

describe('LoginGuard', () => {
	let routerStub;
	beforeEach(() => {
		routerStub = {
			navigate: jasmine.createSpy('navigate')
		};
		TestBed.configureTestingModule({
			providers: [
				LoginGuard,
				{ provide: Router, useValue: routerStub }
			]
		});
	});
	// TODO fix those to use header service instead of local storage.
	it('should return true if user token available', inject([LoginGuard], (service: LoginGuard) => {
		localStorage.setItem('user_token', 'token');

		expect(service.canActivate()).toBe(true);
	}));

	it('should return false if user token is not available', inject([LoginGuard], (service: LoginGuard) => {
		localStorage.removeItem('user_token');
		expect(service.canActivate()).toBe(false);
	}));
});
