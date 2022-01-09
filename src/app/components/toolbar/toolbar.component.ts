import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { filter } from 'rxjs/operators';

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
  route: Subscription;
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(
          (e: NavigationEnd): e is NavigationEnd => e instanceof NavigationEnd
        )
      )
      .subscribe((value) => {
        this.loggedIn = value.url !== '/session/login';
        this.loggedIn
          ? this.changeToolbarForLoggedIn()
          : this.changeToolbarForNotLoggedIn();
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
    this.loggedAs = localStorage.getItem('username');
  }

}
