import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TechnologyDatabaseInterface } from 'src/app/interfaces/technology.interface';
import { ListRequest } from 'src/app/interfaces/any.interface';

@Injectable({
  providedIn: 'root',
})
export class TechnologyService {
  constructor(private http: HttpClient) {}

  getTechnologies(limit = 10, offset = 0) {
    const url = `${environment.apiUrl}/technology/getAll?limit=${limit}&offset=${offset}`;
    return this.http.get<ListRequest<TechnologyDatabaseInterface>>(url).pipe(
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
