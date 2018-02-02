import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {SharedService} from './shared.service.client';

// injecting service into module
@Injectable()

export class UserService {

  baseUrl = environment.baseUrl;
  options: RequestOptions = new RequestOptions();
  constructor(private _http: Http, private router: Router, private sharedService: SharedService) { }

  findUserByUsername(username: string) {
    const url = this.baseUrl + '/api/user?username=' + username;
    return this._http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  register(username: String, password: String) {
    this.options.withCredentials = true;
    const user = {
      username: username,
      password: password
    };
    return this._http.post(this.baseUrl + '/api/register', user)
      .map((res: Response) => {
        const data = res.json();
        return data;
      });
  }

  login(username: String, password: String) {
    this.options.withCredentials = true;
    const body = {
      username: username,
      password: password
    };
    console.log(body.username + '----' + body.password);
    return this._http.post(this.baseUrl + '/api/login', body, this.options)
      .map((res: Response) => {
        return res.json();
      });
  }

  loggedIn() {
    return this._http.post(this.baseUrl + '/api/loggedIn', '', this.options)
      .map((res: Response) => {
        const user = res.json();
        if (user !== 0) {
          this.sharedService.user = user;
          console.log(user.username + 'ikkadaaa');
          return true;
        } else {
          this.sharedService.user = '';
          this.router.navigate(['/login']);
          return false;
        }
      });
  }

}

