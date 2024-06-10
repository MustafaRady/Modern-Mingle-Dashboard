// src/app/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1),
      map(user => {
        const isLoggedIn = !!user;
        const requiresLogin = route.data.requiresLogin;

        if (isLoggedIn && !requiresLogin) {
          // If user is logged in and the route should not be accessed by logged-in users
          this.router.navigate(['/dashboard']);
          return false;
        } else if (!isLoggedIn && requiresLogin) {
          // If user is not logged in and the route requires login
          this.router.navigate(['/login']);
          return false;
        }
        // If neither of the above conditions apply, allow access
        return true;
      })
    );
  }
}
