import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface LocationsApiData {
  id: number;
  flatNo: number;
  homeNo: string;
  plotNo: string;
  cityName: string;
  streetName: string;
  technology: string;
  description: { str: string };
}

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getAllAvailableLocations(): Observable<object> {
    return this.http.get(environment.apiUrl + '/location/get-all').pipe(
      catchError((err) => {
        throw new Error(err);
      })
    );
  }
}
