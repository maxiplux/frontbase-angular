import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { Router } from '@angular/router';
import {Injectable} from "@angular/core";
import {Product, Products} from "../models/product";
import {environment} from "../../../environments/environment";
import Swal from "sweetalert2";

@Injectable()
export class ProductService {
  private urlEndPoint: string = `${environment.baseUrl}/products`;

  constructor(private http: HttpClient, private router: Router) { }

  getProducts(): Observable<Products> {
    return this.http.get<Products>(this.urlEndPoint );
  }



  create(cliente: Product): Observable<Product> {
    return this.http.post(this.urlEndPoint, cliente)
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

  getProduct(id:number): Observable<Product> {
    return this.http.get<Product>(`${this.urlEndPoint}/${id}`).pipe(
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

  update(cliente: Product): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente).pipe(
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
    return this.http.delete<Product>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }


}
