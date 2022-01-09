import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CityService } from '../city/city.service';
import { Observable } from 'rxjs';
import { TechnologyService } from '../technology/technology.service';
import { StreetService } from '../../services/street/street.service';
import { environment } from '../../../environments/environment';
import { Location, StreetDatabase } from '../../interfaces';
import { ListRequest } from 'src/app/interfaces/any.interface';

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

  // getStreetsForCity(simc: string): Observable<object> {
  //   return this.streetService.getStreetsForCity(simc);
  // }

  insertToDatabase(location: Location): Promise<{ success: boolean }> {
    return this.http.put<{ success: boolean }>(environment.apiUrl + '/locations/insert', location).toPromise();
  }

  findStreetsForCity(cityId: number, streetName: string): Promise<ListRequest<StreetDatabase>> {
    return this.http.get<ListRequest<StreetDatabase>>(`${environment.apiUrl}/findStreet/${cityId}/${streetName}`).toPromise();
  }
}
