import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private credentials = [{username: 'norbert', password: 'qwerty'}];
  constructor() { }

  login(username: string, password: string): void{
    this.credentials.forEach(val => {
      if (val.username === username && val.password === password){
        return this.sessionStorage(username);
      }
    });
  }

  private sessionStorage(username: string): void {
    sessionStorage.setItem('username', username);
  }
}
