import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject, Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Snacks } from '../../helpers/snacks';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn$: Subject<boolean> = new Subject<boolean>();
  loggedIn: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snack: Snacks,
    private cookie: CookieService
  ) {}

  login(username: string, password: string): Subscription {
    return this.http
      .post(
        environment.apiUrl + '/user/login',
        { username, password },
        { withCredentials: true }
      )
      .pipe(
        catchError((err) => {
          if (err.status === 401) {
            this.snack.dangerInfo('Dane logowania są niepoprawne!');
          } else {
            this.snack.dangerInfo('Wystąpił nieoczekiwany błąd serwera!');
          }
          return throwError(err);
        })
      )
      .subscribe((val: { _csrf: string; _jwt: string }) => {
        if (val._csrf && val._jwt) {
          return this.setNewSession(val._csrf, val._jwt, username);
        }
      });
  }

  checkSession(): boolean {
    return (
      this.cookie.check('_csrf') &&
      this.cookie.check('_jwt') &&
      this.cookie.check('_username')
    );
  }

  logout(): void {
    this.cookie.deleteAll();
    this.loggedIn$.next(false);
    this.snack.successInfo('Pomyślnie wylogowano z systemu!');
  }

  private async setNewSession(
    csrf: string,
    jwt: string,
    username: string
  ): Promise<void> {
    this.setCookies(csrf, jwt, username);
    this.loggedIn$.next(true);
    await this.router.navigate(['/home']);
  }
  private setCookies(csrf: string, jwt: string, username: string): void {
    const cookieOpts = { path: '/' };
    this.cookie.set('_csrf', csrf, cookieOpts);
    this.cookie.set('_jwt', jwt, cookieOpts);
    this.cookie.set('_username', username, cookieOpts);
  }
}
