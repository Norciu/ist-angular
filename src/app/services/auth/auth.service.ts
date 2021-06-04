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
    return this.http.post<{ authorization: string, username: string }>(`${environment.apiUrl}/user/login`, { username, password })
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
      .subscribe(({ authorization, username}) => {
        if (authorization && username) {
          return this.setNewSession(authorization, username);
        }
      });
  }

  checkSession(): boolean {
    return (
      this.cookie.check('_jwt') &&
      this.cookie.check('_username')
    );
  }

  logout(): void {
    this.cookie.deleteAll();
    this.loggedIn$.next(false);
    this.snack.successInfo('Pomyślnie wylogowano z systemu!');
  }

  private async setNewSession(authorization: string, username: string): Promise<void> {
    this.loggedIn$.next(true);
    this.setSession(authorization, username);
    await this.router.navigate(['/home']);
  }

  public setSession(authorization: string, username: string): void {
    localStorage.setItem('authorization', authorization);
    localStorage.setItem('username', username);
  }
}
