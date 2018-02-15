import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {

	constructor(
		private router: Router,
		private authService: AuthService
	) {}

	canActivate(): Observable<boolean>|boolean {
		let loginData = this.authService.getLoginData();
		let userData = loginData.username && loginData.password;
		if (userData) {
			return true;
		} else {
			this.router.navigate(['/login']);
			return false;
		}
	}
}
