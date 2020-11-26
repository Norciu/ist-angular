import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  title = 'Internetowy system teleoperatorów';
  loggedIn: boolean;
  currentUrlRoute: string;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(
        (event: { id: number; url: string; urlAfterRedirects: string }) => {
          this.currentUrlRoute = event.urlAfterRedirects;
          if (this.authService.checkSession()) {
            this.loggedIn = true;
            this.changeToolbarForLoggedIn();
          }
          else {
            this.loggedIn = false;
            this.changeToolbarForLoggedIn();
          }
        }
      );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/session/login']);
  }

  changeToolbarForLoggedIn(): void {
    this.setTitle();
  }

  private setTitle(): void {
    this.title =
      this.currentUrlRoute !== '/session/login'
        ? 'IST'
        : 'Internetowy system teleoperatorów';
  }
}
