import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/model/user';
import { LoggedUserService } from 'src/app/service/logged-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User;

  constructor(private router: Router,
              private authSerice: AuthService,
              private sessionUserService: LoggedUserService) { }

  ngOnInit() {
    this.currentUser = this.sessionUserService.getSessionUser();
  }

  logout(){
    localStorage.clear();
    this.router.navigate(["login"]);
  }

  goHome(){
    this.router.navigate(["list"]);
  }

  patronsList(){
    this.router.navigate(["patrons-list"]);
  }

  isLogged(): boolean {
    return this.authSerice.isAuthenticated()
  }

  getCurrentUserName(){
    return this.sessionUserService.getSessionUser().username
  }
}
