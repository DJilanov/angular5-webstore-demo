import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-server-error-page',
	templateUrl: './server-error-page.component.html',
	styleUrls: ['./server-error-page.component.scss']
})

export class ServerErrorPageComponent {

	constructor(
		private router: Router
	) {
		
	}
}
