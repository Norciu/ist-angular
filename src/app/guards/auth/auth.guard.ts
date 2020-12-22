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
import { HttpClient } from '@angular/common/http';
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
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkSession();
  }

  public checkSession(): Promise<boolean> {
    return this.http
      .get(environment.apiUrl + '/user/is-logged')
      .pipe(
        catchError((err) => {
          this.router.navigate(['/session/login']);
          if (err.status !== 500 && err.status !== 0) {
            this.snacks.dangerInfo(
              'Brak autoryzacji! Zaloguj się, aby kontynuować.'
            );
          } else {
            this.snacks.dangerInfo(
              'Aplikacja jest aktualnie niedostępna! Spróbuj ponownie później.'
            );
          }
          this.isLogged = false;
          this.clearSession();
          throw new Error(err);
        })
      )
      .toPromise()
      .then((value: { isLogged: boolean }) => {
        this.isLogged = true;
        return value.isLogged;
      });
  }

  private clearSession(): void {
    this.cookies.deleteAll();
  }
}
