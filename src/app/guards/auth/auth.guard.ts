import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { catchError } from 'rxjs/operators';
import { Snacks } from '../../helpers/snacks';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  public isLogged: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
    private cookies: CookieService,
    private snacks: Snacks
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean| UrlTree {
    return this.checkSession();
  }

  public checkSession(): boolean {
    const auth = localStorage.getItem('authorization');
    const username = localStorage.getItem('username');
    return Boolean(auth && auth.length && username && username.length);
  }

  private clearSession(): void {
    localStorage.clear();
  }
}
