import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CityService } from '../../components/city/city.service';
import { Observable } from 'rxjs';
import { CityDatabaseInterface } from '../../interfaces';
import { TechnologyService } from '../technology/technology.service';
import {StreetService} from '../street/street.service';
import {environment} from '../../../environments/environment';
import {Location} from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(
    private http: HttpClient,
    private cityService: CityService,
    private streetService: StreetService,
    private technologyService: TechnologyService
  ) {}

  getAvailableCities(): Observable<object> {
    return this.cityService.getAll();
  }

  getAvailableTechnologies(): Observable<object> {
    return this.technologyService.getTechnologies();
  }

  getStreetsForCity(simc: string): Observable<object> {
    return this.streetService.getStreetsForCity(simc);
  }

  insertToDatabase(location: Location): Observable<object> {
    return this.http.put(environment.apiUrl + '/location/insert', location);
  }
}
