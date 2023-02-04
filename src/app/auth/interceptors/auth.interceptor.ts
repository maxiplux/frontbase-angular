import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';


import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {AuthService} from "../AuthService";
import Swal from "sweetalert2";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {



    return next.handle(req).pipe(
      catchError(response => {
        if (response.status == 401)
        {

          if (this.authService.isAuthenticated())
          {
            this.authService.logout();
          }
          this.router.navigate(['/login']);
        }

        if (response.status == 403)
        {
          Swal.fire('Acceso denegado', `Hola ${this.authService.user.username} no tienes acceso a este recurso!`, 'warning');
          this.router.navigate(['/dashboard']);
        }
        return throwError(response);
      })
    );
  }
}
