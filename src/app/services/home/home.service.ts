import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ListRequest } from 'src/app/interfaces/any.interface';
import { LocationApi } from 'src/app/interfaces';

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
    return this.http.get(environment.apiUrl + '/locations/getAll').pipe(
      catchError((err) => {
        throw new Error(err);
      })
    );
  }

  getAllLocations(limit = 10, offset = 0) {
    return this.http.get<ListRequest<LocationApi>>(`${environment.apiUrl}/locations/getAll?limit=${limit}&offset=${offset}`).toPromise();
  }
}
