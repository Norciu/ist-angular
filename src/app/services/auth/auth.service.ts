import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {of, Subscription, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private credentials: { username: string; password: string }[] = [
    { username: 'norbert', password: 'qwerty' },
    { username: 'test', password: '12345678' },
  ];
  constructor(private snack: MatSnackBar, private http: HttpClient) {}

  // login(username: string, password: string): boolean {
  //   for (const val of this.credentials) {
  //     if (val.username === username && val.password === password) {
  //       this.sessionStorage(username);
  //       return true;
  //     }
  //   }
  //   this.dangerInfo('Niepoprawne dane logowania');
  //   return false;
  // }
  login(username: string, password: string): Subscription {
    return this.http
      .post(environment.apiUrl + '/user/login', { username, password })
      .pipe(catchError(err => {
        if (err.status === 401) {
          this.dangerInfo('Dane logowania są niepoprawne!');
          return throwError(err);
        }
      } ))
      .subscribe((val) => {
        // TODO Wstawianie tokenów _csrf oraz _jwt bezpośrednio do Cookies
        console.log(val);
        return val;
      });
  }

  checkSession(): boolean {
    return !!sessionStorage.getItem('username');
  }

  logout(): void {
    sessionStorage.removeItem('username');
  }

  private sessionStorage(username: string): void {
    sessionStorage.setItem('username', username);
  }

  private dangerInfo(message: string): void {
    this.snack.open(message, '', {
      duration: 3000,
      panelClass: 'danger-snackbar',
    });
  }

  private successInfo(message: string): void {
    this.snack.open(message, '', {
      duration: 3000,
      panelClass: '',
    });
  }
}
