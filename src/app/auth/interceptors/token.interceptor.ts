import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import {AuthService} from "../AuthService";



@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {

  }


  intercept(req: HttpRequest<any>, next: HttpHandler):

    Observable<HttpEvent<any>> {



        if (!req.url.includes('oauth/token'))
    {

      let token = this.authService.token;

      if (token != '')
      {
        const authReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token)
        });

        return next.handle(authReq);
      }
    }


    return next.handle(req);
  }
}
