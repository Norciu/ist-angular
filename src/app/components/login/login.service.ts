import { Injectable } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private auth: AuthService, private router: Router) { }

  loginUser(username: string, password: string): boolean {
    const res = this.auth.login(username, password);
    if (res) {
      this.router.navigate(['/home']);
      return res;
    }
  }
}
