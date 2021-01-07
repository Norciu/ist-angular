import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CityService {

  constructor(private http: HttpClient) {}

  send(cityName: string, postalCode: string , simc: string): Observable<any> {
    return this.http.put(
      environment.apiUrl + '/city/insert',
      {
        cityName,
        postalCode,
        simc,
      },
    );
  }

  getAll(): Observable<object> {
    return this.http.get(environment.apiUrl + '/city/get-all');
  }
}
