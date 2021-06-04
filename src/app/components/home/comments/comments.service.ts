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

  getComments(locationId: string): Observable<GetComments[]> {
    return this.http.get<GetComments[]>(`${environment.apiUrl}/comment/get/${locationId}`);
  }

  add(locationId: string, description: string): Observable<{ success: true }> {
    return this.http.put<{ success: true }>(`${environment.apiUrl}/comment/add`, { locationId, description });
  }
}
