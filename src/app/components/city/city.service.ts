import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable} from 'rxjs';
import { CityRequestAll, CityDatabaseInterface } from 'src/app/interfaces/city.interface';

@Injectable({
  providedIn: 'root',
})
export class CityService {

  constructor(private http: HttpClient) {}

  send(cityName: string, postalCode: string , simc: string): Observable<CityRequestAll & { inserted: CityDatabaseInterface }> {
    return this.http.put<CityRequestAll & { inserted: CityDatabaseInterface }>(environment.apiUrl + '/city/insert', { cityName, postalCode, simc });
  }

  getAll(limit = 10, offset = 0): Observable<CityRequestAll> {
    return this.http.get<CityRequestAll>(environment.apiUrl + `/city/getAll?limit=${limit}&offset=${offset}`);
  }

  find(param: string): Observable<CityRequestAll> {
    return this.http.get<CityRequestAll>(environment.apiUrl + `/city/find?param=${param}`);
  }
}
