import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  userList: User[]
  
  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(data => {
      this.userList = data
    });
  }

  addUser(){
      this.router.navigate(['add-user']);
  }

  onSelect(user: User): void {
    this.router.navigate([`change-password/${user.id}`]);
  }
}
