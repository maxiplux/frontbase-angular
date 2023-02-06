import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../services/product.services";
import {Product, Products} from "../../../models/product";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import Productform from "../../../models/productoform";
import {Generic, Industry, Sector} from "../../../models/generics";

@Component({
  selector: 'app-producteditor',
  templateUrl: './producteditor.component.html',
  styleUrls: ['./producteditor.component.css']
})
export class ProducteditorComponent  implements OnInit {

  product!:Product;

  induestries:Industry[] ;
  sectors:Sector[] ;


  form!:FormGroup;
  constructor(private productServices: ProductService,

  private router: Router, private formBuilder: FormBuilder,
  private activatedRoute: ActivatedRoute
  ) {
    this.induestries = [];
    this.sectors = [];
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      industry: ['', Validators.required],
      sector: ['', Validators.required],
      website: ['', Validators.required],
      rank: ['', Validators.required],

    });
    }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      // @ts-ignore

      const id:number = +params.get('id') || 0;


      if (id)
      {
        this.productServices.getProduct(id).subscribe((product) => {
          this.product = product


          this.productServices.getIndustries().subscribe((industries) => {  this.induestries = industries._embedded.industries;});
          this.productServices.getSectors().subscribe(  (sectors) => {  this.sectors = sectors._embedded.sectors;});




          this.form.patchValue(this.product);



        });
      }

    });
    }


  compareFn(c1: Generic, c2: Generic): boolean {
    return c1 && c2 ? c1.name === c2.name : c1 === c2;
  }

  submit() {

    this.product = this.form.value as Product;

    if (this.product.id)
    {
      this.productServices.update(this.product).subscribe((product) => {
        Swal.fire('Success', 'Product Updated', 'success');
        this.router.navigate(['dashboard/products']);
      });
    }else{
      this.productServices.saveProduct(this.form.value).subscribe((product) => {
        this.product=product;
        Swal.fire(    'Product!',        `The ${this.product.name}, has been update sucessfully!`, 'success');
      });
    }


  }
}
