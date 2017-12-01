import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AdminGuard implements CanActivate {



  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.userDetails
    .take(1)
    .map((userDetails) => {
      console.log(userDetails);
      if (userDetails) {
        if (userDetails.isAdmin) {
          return true;
        }
        else {
          this.router.navigate(['/login']);
          return false;
        }
      }
      else {
        this.router.navigate(['/login']);
        return false;
      }
    })
  }
}
