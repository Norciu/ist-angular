import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TechnologyService {
  constructor(private http: HttpClient) {}

  getTechnologies(): Observable<object> {
    return this.http.get(environment.apiUrl + '/technology/get-all').pipe(
      catchError((err) => {
        throw new Error(err);
      })
    );
  }

  addTechnologyToDatabase(technologyName: string): Observable<object> {
    return this.http
      .put(environment.apiUrl + '/technology/insert', {
        technologyName,
      })
      .pipe(
        catchError((err) => {
          throw new Error(err);
        })
      );
  }
}
