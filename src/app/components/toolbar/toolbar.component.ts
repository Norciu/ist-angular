import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { filter, map } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
    private http: HttpClient,
    private authService: AuthService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  async ngOnInit(): Promise<void> {
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

  forwardGithub(url: 'backend' | 'frontend') {
    return window.open(`${url === 'backend' ? 'https://github.com/Norciu/ist-backend-nest' : 'https://github.com/Norciu/ist-angular'}`, '_blank');
  }

  async getDocs(type: 'pdf' | 'docx') {
    const data = await this.http.get(`${environment.apiUrl}/docs/${type}`, { responseType: 'arraybuffer' })
      .pipe(map(res => new Blob([res], { type: 'application/pdf' }))).toPromise();
    const url = URL.createObjectURL(data);
    window.open(url, '_blank');
  }

}
