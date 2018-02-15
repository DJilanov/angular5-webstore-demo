import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ErrorMessageComponent } from './error-message.component';


describe('ErrorMessageComponent', () => {
	let component: ErrorMessageComponent;
	let fixture: ComponentFixture<ErrorMessageComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ErrorMessageComponent],
			imports: [CommonModule, FormsModule, ReactiveFormsModule],
		});
		fixture = TestBed.createComponent(ErrorMessageComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
