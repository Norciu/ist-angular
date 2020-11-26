import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth/auth.service';
import {interval, Observable, Observer} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // login$: Observable<boolean> = interval(5000).pipe(val => {
  //   return this.authService.checkSession();
  // });
  loggedIn: boolean;
  constructor(private authService: AuthService) {
  }
  title = 'ist';

  ngOnInit(): void {}
}
