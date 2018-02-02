import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ProductService} from '../../services/product.service.client';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service.client';
import {SharedService} from '../../services/shared.service.client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  all_products: [{}];
  user: any;
  userExists: boolean;

  constructor(private productService: ProductService, private  router: Router, private sharedService: SharedService) { }

  ngOnInit() {
    this.user = this.sharedService.user;
    if (this.user['_id'] !== undefined) {
      this.userExists = true;
    }

    this.productService.findAllProducts().subscribe((productList: any) => {
      this.all_products = productList;
    });
    }

  addToCart(productId) {
    if (this.userExists) {
      // add to cart
    }else {
      this.router.navigate(['/login']);
    }
    }
  }


