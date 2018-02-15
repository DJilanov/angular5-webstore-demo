/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InformationalPageComponent } from './informational-page.component';

describe('InformationalPageComponent', () => {
	let component: InformationalPageComponent;
	let fixture: ComponentFixture<InformationalPageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [InformationalPageComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InformationalPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
