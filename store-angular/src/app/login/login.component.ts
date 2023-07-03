import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userFormGroup! : FormGroup;
  errorMassage! : string;
  constructor(private fb : FormBuilder, private authService : AuthenticationService, private router : Router) { }

  ngOnInit(): void {
    this.userFormGroup = this.fb.group({
      username : this.fb.control(""),
      password : this.fb.control(""),
    });
  }

  login() {
    let username = this.userFormGroup.value.username;
    let password = this.userFormGroup.value.password;
    this.authService.login(username, password).subscribe({
      next: user => {
        this.authService.authenticateUser(user).subscribe({
          next: value => {
            this.router.navigateByUrl("/admin");
          }
        })
      },
      error: err => {
        this.errorMassage = err;
      }
    })
  }
}
