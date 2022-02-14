import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http: HttpClient) { }

  async getPieChartData(): Promise<{ success: boolean, result: unknown }> {
    return this.http.get<{ success: boolean, result: unknown }>(`${environment.apiUrl}/statistic/pieChart`).toPromise();
  }

  async getBarChartData(): Promise<{ success: boolean, result: number[] }> {
    return this.http.get<{ success: boolean, result: number[] }>(`${environment.apiUrl}/statistic/barChart`).toPromise();
  }


}
