import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoggedUserService } from './logged-user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate{

  constructor(private sessionUserService: LoggedUserService,
              private router: Router) { }

  canActivate(): boolean {
    const user = this.sessionUserService.getSessionUser();
    if(!user.isAdmin){
      this.router.navigate(['auth-error']);
      return false;
    }

    return true;
  }

}
