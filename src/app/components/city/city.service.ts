import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private http: HttpClient, private cookies: CookieService) {}

  send(cityName: string, simc: string): Observable<any> {
    return this.http.put(
      environment.apiUrl + '/city/insert',
      {
        cityName,
        simc,
      },
      {
        headers: {
          authorization: this.cookies.get('_jwt'),
          'csrf-token': this.cookies.get('_csrf'),
        },
        withCredentials: true,
      }
    );
  }
}
