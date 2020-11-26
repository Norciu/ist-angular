import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private credentials: { username: string; password: string }[] = [
    { username: 'norbert', password: 'qwerty' },
    { username: 'test', password: '12345678' },
  ];
  constructor(private snack: MatSnackBar) {}

  login(username: string, password: string): boolean {
    for (const val of this.credentials) {
      if (val.username === username && val.password === password) {
        this.sessionStorage(username);
        return true;
      }
    }
    this.dangerInfo('Niepoprawne dane logowania');
    return false;
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
