import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

export interface GetComments {
  description: string;
  user_name: string;
  created_at: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  getComments(locationId: string | number): Observable<{result: GetComments[], total: number}> {
    return this.http.get<{result: GetComments[], total: number}>(`${environment.apiUrl}/comment/get/${locationId}`);
  }

  add(location_id: string, description: string): Observable<{ success: boolean, result: GetComments[], total: number }> {
    return this.http.put<{ success: boolean, result: GetComments[], total: number }>(`${environment.apiUrl}/comment/add`, { location_id, description });
  }
}
