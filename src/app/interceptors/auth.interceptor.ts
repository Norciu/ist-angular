import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookies: CookieService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const jwt = this.cookies.get('_jwt');
    const authReq = request.clone({
      setHeaders: { authorization: jwt },
      withCredentials: true
    });
    return jwt ? next.handle(authReq) : next.handle(request.clone({withCredentials: true}));
  }
}
