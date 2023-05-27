import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate { // canActivate interface includes url tree, redirrect users with it.

constructor(private authService : AuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Your guard logic here

    return this.authService.user.pipe(map(user => {
        const isAuth = !!user;

        if(isAuth){
            return true;
        }

        return this.router.createUrlTree(['/auth']);
    }))

    return true; // or false or UrlTree
  }
}