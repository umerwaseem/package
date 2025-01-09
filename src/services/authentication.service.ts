import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UtilityService } from './utility.service';
import { ApiService } from './api.service';
import { Observable, Subscription, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }
  isLoggedIn(): boolean {
    let token = localStorage.getItem('access_token')
    // let token = sessionStorage.getItem('access_token')
    if (token != null) {
      return true
    }
    else {
      return false
    }
  }
  isForcePass(): boolean {
    let forcePass = localStorage.getItem('forcePassword')
    if (forcePass) {
      return true
    }
    else {
      return false
    }
  }
}

@Injectable()
export class AlwaysAuthService implements CanActivate {
  canActivate() {
    localStorage.clear()
    this.router.navigate(['/page-login'])
    return true
  }
  constructor(public router: Router) { }

}

@Injectable()
export class OnlyLoggedOutUserGuard implements CanActivate {
  constructor(public userService: AuthenticationService, public router: Router) { }
  /* canActivate() {
    if (!this.userService.isLoggedIn()) {
      return true
    } if (this.userService.isLoggedIn() && this.userService.isForcePass()) {
      this.router.navigate(['/change-password'])
      return true
    } else {
      this.router.navigate(['/dashboard'])
    }
  } */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this.userService.isLoggedIn()) {
        return true;  // Allow navigation if the user is not logged in
      } else if (this.userService.isLoggedIn() && this.userService.isForcePass()) {
        // Redirect to the change password page if the user is logged in but needs to change their password
        this.router.navigate(['/change-password']);
        return false;  // Prevent navigation to the target route
      } else {
        // Redirect to the dashboard if the user is logged in and doesn't need to change the password
        this.router.navigate(['/dashboard']);
        return false;  // Prevent navigation to the target route
      }
    }
}

@Injectable()
export class forgotPasswordUserGuard implements CanActivate {
  constructor(public userService: AuthenticationService, public router: Router) { }
  canActivate() {
    
    
    return true;
    if (!this.userService.isLoggedIn()) {
    } 
  }
}


@Injectable()
export class OnlyLoggedInUserGuard implements CanActivate {

  expireTime: any
  constructor(public util: UtilityService, public service: ApiService, public userService: AuthenticationService, public router: Router) { }
  canActivate() {
    let isSuperAdmin:any
    if (localStorage.getItem('expires_in')) {
      this.expireTime = localStorage.getItem('expires_in')
      this.checkToukenTime()
    }

    if (this.userService.isLoggedIn() && !this.userService.isForcePass() ) {
      return true
    } else {
      this.router.navigate(['/page-login'])
      return false
    }


  }
  checkToukenTime() {
    // 
    //-50 second because to manage refresh token response
    // this.util.source = interval((this.expireTime - 50) * 1000)
    // 
    // this.util.subscription = this.util.source.subscribe(val => {
    //   this.service.refreshToken(401)
    //     .then(
    //       // res=> 
    //       // (res) => {
    //       //   
    //       // 
    //       // }
    //     )
    // });
    // this.service.refreshToken(401)
    //   .then(
    //     // res=> 
    //     // (res) => {
    //     //   
    //     // 
    //     // }
    //   )

  }


}

@Injectable()
export class IsForceChangePassword implements CanActivate {
  constructor(public userService: AuthenticationService, public router: Router) { }
  /* canActivate() {
    if (this.userService.isForcePass() && this.userService.isLoggedIn()) {
      return true
    } else {
      this.router.navigate(['/page-login'])
    }
  } */
    canActivate() {
      if (this.userService.isForcePass() && this.userService.isLoggedIn()) {
        return true;  // Allow the route to be activated if the user is logged in and force password is true
      } else {
        this.router.navigate(['/page-login']);
        return false;  // Prevent the route from being activated if the conditions are not met
      }
    }
}