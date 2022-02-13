import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  getAllMarkers(): Promise<{ success: boolean, coordinates: { coordinates: [number, number] }[] }> {
    return this.http.get<{ success: boolean, coordinates: { coordinates: [number, number] }[] }>(`${environment.apiUrl}/locations/getAllMarkers`).toPromise();
  }

  getLocationLonLat(location_id: number | string): Promise<{ success: boolean, result: [number, number] }> {
    return this.http.get<{ success: boolean, result: [number, number] }>(`${environment.apiUrl}/locations/getLocationLonLat/${location_id}`).toPromise();
  }
}
