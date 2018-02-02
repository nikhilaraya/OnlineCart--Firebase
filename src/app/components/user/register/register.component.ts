import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') registerForm: NgForm;
  username: string;
  password: string;
  repassword: string;
  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';
  error;
  role: string;

  constructor(private userService: UserService, private  router: Router) { }

  ngOnInit() {
    this.errorFlag = false;
    this.username = '';
    this.password = '';
    this.repassword = '';
  }

  register() {
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.repassword = this.registerForm.value.repassword;
    this.userService.findUserByUsername(this.username)
      .subscribe((user: any) => {
        if (user !== null) {
          this.errorMsg = 'User already exists!';
          this.errorFlag = true;
        } else if (this.repassword === this.password) {
          const newUser = {
            username: this.username,
            password: this.password
          };
          console.log(this.username);
          console.log(this.password);

          this.userService.register(this.username, this.password)
            .subscribe((data: any) => {
              console.log('yahooo');
                this.router.navigate(['/profile']);
              },
              (error: any) => {
                console.log('papam');
                this.error = error._body;
              });
        }
      });
  }
}
