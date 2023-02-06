import {HttpClient, HttpRequest, HttpEvent, HttpHeaders} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { Router } from '@angular/router';
import {Injectable} from "@angular/core";
import {Product, Products} from "../models/product";
import {environment} from "../../../environments/environment";
import Swal from "sweetalert2";
import {GenericCollection, IndustryCollection, Sector, SectorCollection} from "../models/generics";

@Injectable()
export class ProductService {
  private productsEndPoint: string = `${environment.baseUrl}/products`;
  private industriesEndPoint: string = `${environment.baseUrl}/industries?size=200`;
  private sectorEndPoint: string = `${environment.baseUrl}/sectors?size=200`;

  constructor(private http: HttpClient, private router: Router) { }

  getSectors(): Observable<GenericCollection<SectorCollection>> {
    return this.http.get<GenericCollection<SectorCollection>>(this.sectorEndPoint );
  }

  getIndustries(): Observable<GenericCollection<IndustryCollection>> {
    return this.http.get<GenericCollection<IndustryCollection>>(this.industriesEndPoint );
  }
  getProducts(): Observable<Products> {
    return this.http.get<Products>(this.productsEndPoint );
  }
  getProductsByPage(id:number): Observable<Products> {

    return this.http.get<Products>(`${this.productsEndPoint}/?sort=id&page=${id}`).pipe(
      catchError(e =>
      {

        if (e.status != 401 && e.error.mensaje)
        {

          this.router.navigate(['/dashboard/products']);
          console.error(e.error.mensaje);
          Swal.fire(    'Error Create Product!',        `Failed ${e.error.mensaje}!`, 'error');
        }

        return throwError(e);
      }));
  }



  create(cliente: Product): Observable<Product> {
    return this.http.post(this.productsEndPoint, cliente)
      .pipe(
        map((response: any) => response.cliente as Product),
        catchError(e =>
        {
          Swal.fire(    'Error Create Product!',        `Failed ${e.error.mensaje}!`, 'error');
          if (e.status == 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        }));
  }



  update(product: Product): Observable<any> {
    return this.http.put<any>(`${this.productsEndPoint}/${product.id}/`, product).pipe(
      catchError(e => {
        if (e.status == 400)
        {
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }

  delete(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.productsEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }

  getProduct(id:number): Observable<Product> {
    return this.http.get<Product>(`${this.productsEndPoint}/${id}/`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/404']);

        }
        return throwError(e);
      }));
  }


  saveProduct(value : Product): Observable<Product> {
    return this.http.post<Product>(`${this.productsEndPoint}`, value).pipe(
      catchError(e =>
      {

        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/404']);
        }
        return throwError(e);
      }));

  }
}
