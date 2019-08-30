import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  addForm: FormGroup;
  submitted:boolean = false;
  error: Error

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.addForm.controls; }

  onSubmit() {
    this.submitted = true;
    
    if (this.addForm.invalid) {
      return;
    }
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.changePassword(id, this.addForm.value)
      .subscribe(data => { 
        this.router.navigate(['user-management'])
      },
      error => {
        this.submitted = false;
        console.error(error)
        this.error = error;
      });
  }

}
