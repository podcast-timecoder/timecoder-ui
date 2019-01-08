import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private authSerice: AuthService) { }

  ngOnInit() {
  }

  logout(){
    localStorage.clear();
    this.router.navigate(["login"]);
  }

  isLogged(): boolean {
    return this.authSerice.isAuthenticated()
  }
}
