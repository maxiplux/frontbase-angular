import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../auth/AuthService";
import {ActivatedRoute, Router} from "@angular/router";
import {UserCredentials} from "../../models/user";
import {Product, Products} from "../../models/product";
import {ProductService} from "../../services/product.services";
import {tap} from "rxjs/operators";
import Swal from "sweetalert2";
import {Paginator} from "../../models/paginator";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  implements OnInit {
  products!: Product[] ;
  paginator!:Paginator;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private  productServices:ProductService, private router: Router,private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.products = [];
    this.paginator = {size: 10, totalElements: 1000, totalPages: 100, number: 0, component: '/dashboard/products/page/', first: true, numberOfElements: 10, empty: false, last: false};
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number=0;
      // @ts-ignore
      page = 0 || +params.get('page');



      this.productServices.getProductsByPage(page)
        .pipe(
        ).subscribe(response => {
          const currentPaginator={size: response.size, totalElements: response.totalElements, totalPages: response.totalPages, number: response.number, component: '/dashboard/products/page/', first: response.first, numberOfElements: response.numberOfElements, empty: response.empty, last: response.last};
          this.paginator= currentPaginator;

          this.products = response.content;


      });

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
