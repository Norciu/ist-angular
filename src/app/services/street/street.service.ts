import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StreetService {
  constructor(private http: HttpClient) {}

  getAvailableCities(): Observable<object> {
    return this.http.get(environment.apiUrl + '/street/available-cities').pipe(
      catchError((err) => {
        throw new Error(err);
      })
    );
  }

  getStreets(): Observable<object> {
    return this.http.get(environment.apiUrl + '/street/get-all').pipe(
      catchError((err) => {
        throw new Error(err);
      })
    );
  }

  addStreetToDatabase(
    citySimc: string,
    streetName: string,
    ulic: string
  ): Observable<object> {
    return this.http.put(environment.apiUrl + '/street/insert', {
      citySimc,
      streetName,
      ulic,
    });
  }

  getStreetsForCity(simc: string): Observable<object> {
    return this.http.get(environment.apiUrl + '/street/search?simc=' + simc);
  }
}
