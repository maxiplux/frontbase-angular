import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../auth/AuthService";
import {Router} from "@angular/router";
import {UserCredentials} from "../../models/user";
import {Product, Products} from "../../models/product";
import {ProductService} from "../../services/product.services";
import {tap} from "rxjs/operators";
import Swal from "sweetalert2";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  implements OnInit {
  products!: Product[] ;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private  productServices:ProductService, private router: Router) {}
  ngOnInit(): void {

    this.products = [];
    this.productServices.getProducts()
      .pipe(
      ).subscribe(response => {
      this.products = response._embedded.products;
      console.log(`products ${this.products}`, this.products);
    });

  }
  //form:FormGroup;
  /*
  products!: Product[] ;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private  productServices:ProductService, private router: Router) {}

  ngOnInit() {
    Swal.fire(    'Error Create Product!',        `Failed  !`, 'error');
    this.products = [];
    this.productServices.getProducts()
      .pipe(

      ).subscribe(response => {
      this.products = response._embedded.products;
    });

  }
*/


}
