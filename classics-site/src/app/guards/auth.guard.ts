import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {


  constructor(private router: Router, private authService: AuthService) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.user
         .take(1)
         .map(user => !!user)
         .do(loggedIn => {
           if (!loggedIn) {
             console.log('access denied')
             this.router.navigate(['/login']);
           }
         });
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
