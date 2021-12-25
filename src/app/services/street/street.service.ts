import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, debounceTime } from 'rxjs/operators';
import { AvailableCities } from 'src/app/components/street/street.component';
import { StreetDatabase } from 'src/app/interfaces';

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

  getStreets(limit = 10, offset = 0, id?: number): Observable<{ success: boolean, result: StreetDatabase[], total: number }> {
    const cityId = `${id ? `&id=${id}`: ''}`;
    return this.http.get<{ success: boolean, result: StreetDatabase[], total: number }>
        (environment.apiUrl + `/street/getAll?limit=${limit}&offset=${offset}${cityId}`).pipe(
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

  getStreetsForCity(id: number | string): Promise<{ result: AvailableCities[], total: number }> {
    return this.http.get<{ result: AvailableCities[], total: number }>(environment.apiUrl + `/street/streets/${id}`).toPromise();
  }

  searchCity(param: string): Promise<{ result: AvailableCities[], total }> {
    return this.http.get<{ result: AvailableCities[], total }>(environment.apiUrl + `/city/find/${param}`).toPromise();
  }
}
