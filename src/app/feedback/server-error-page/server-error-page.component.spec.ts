import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServerErrorPageComponent } from './server-error-page.component';


describe('ServerErrorPageComponent', () => {
	let comp: ServerErrorPageComponent;
	let fixture: ComponentFixture<ServerErrorPageComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ServerErrorPageComponent],
			imports: [CommonModule, FormsModule, ReactiveFormsModule],
		});
		fixture = TestBed.createComponent(ServerErrorPageComponent);
		comp = fixture.componentInstance;
	});
});
