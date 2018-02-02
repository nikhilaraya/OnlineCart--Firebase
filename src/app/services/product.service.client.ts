import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()

export class ProductService {

  baseUrl = environment.baseUrl;
  options: RequestOptions = new RequestOptions();
  constructor(private _http: Http, private router: Router) { }

  findAllProducts() {
    const url = this.baseUrl + '/api/products/';
    return this._http.get(url).map((response: Response) => {
      return response.json();
    });
  }
}

