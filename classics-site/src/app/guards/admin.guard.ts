import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../interfaces/user.interface';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  userDetails: User;
  userDetailsSubscription: Subscription;

  constructor(private router: Router, private authService: AuthService) {
    this.userDetails = this.authService.userDetails;
    this.userDetailsSubscription = this.authService.userDetailsChange.subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userDetails) {
      if (this.userDetails.isAdmin) {
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
  }
}
