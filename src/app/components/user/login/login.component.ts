import { Component, OnInit,  ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';
import {SharedService} from '../../../services/shared.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;
  username: string;
  password: string;
  errorMsg = 'Invalid username or password !';
  error;

  constructor(private userService: UserService, private  router: Router, private sharedService: SharedService) { }

  ngOnInit() {
    this.username = '';
    this.password = '';
  }

  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.userService.login(this.username, this.password)
      .subscribe((user: any) => {
        if (user !== null) {
          this.sharedService.user = user;
          this.router.navigate(['/profile']);
        }
      });
  }

}
