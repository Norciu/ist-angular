import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import {AuthGuard} from '../../guards/auth/auth.guard';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  title = 'Internetowy system teleoperatorów';
  loggedIn$: Subscription;
  loggedIn: boolean = this.authService.checkSession();
  loggedAs: string;
  constructor(
    private router: Router,
    private authService: AuthService,
    private cookie: CookieService,
    private authGuard: AuthGuard
  ) {}

  ngOnInit(): void {
    this.loggedIn
      ? this.changeToolbarForLoggedIn()
      : this.changeToolbarForNotLoggedIn();
    this.loggedIn$ = this.authService.loggedIn$
      .asObservable()
      .subscribe((val) => {
        val
          ? this.changeToolbarForLoggedIn()
          : this.changeToolbarForNotLoggedIn();
        this.loggedIn = val;
      });
  }

  ngOnDestroy(): void {
    this.loggedIn$.unsubscribe();
  }

  changeToolbarForNotLoggedIn(): void {
    this.title = 'Internetowy system teleoperatorów';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/session/login']);
  }

  changeToolbarForLoggedIn(): void {
    this.title = 'IST';
    this.loggedAs = this.cookie.get('_username');
  }
}
