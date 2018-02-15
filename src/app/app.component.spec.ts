/* tslint:disable:no-unused-variable */
import { FormsModule } from '@angular/forms';
import { TestBed, async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
	Http, HttpModule, XHRBackend, ResponseOptions,
	Response, BaseRequestOptions
} from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: Http, useFactory: (backend, options) => {
						return new Http(backend, options);
					},
					deps: [MockBackend, BaseRequestOptions]
				},
				MockBackend,
				BaseRequestOptions
			],
			declarations: [
				AppComponent
			],
			imports: [
				FormsModule
			]
		});
	});

	it('should create the app', async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));
});
