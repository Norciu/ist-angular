import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Snacks } from '../../helpers/snacks';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  public isLogged: boolean;

  constructor(
    private router: Router,
    private snacks: Snacks
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean| UrlTree {
    return this.checkSession();
  }

  public checkSession(): boolean {
    const auth = localStorage.getItem('authorization');
    const username = localStorage.getItem('username');
    const isLogged = Boolean(auth && auth.length && username && username.length);

    if (!isLogged) {
      this.clearSession();
      this.router.navigate(['/session/login']);
      this.snacks.dangerInfo(
        'Brak autoryzacji! Zaloguj się, aby kontynuować.'
      );
    }

    return isLogged;
  }

  private clearSession(): void {
    localStorage.clear();
  }
}
