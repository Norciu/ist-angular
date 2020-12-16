import { Injectable } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private auth: AuthService) { }

  loginUser(username: string, password: string): void {
    this.auth.login(username, password);
  }
}
