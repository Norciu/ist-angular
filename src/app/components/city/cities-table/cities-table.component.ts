import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CityDatabaseInterface } from '../../../interfaces';

@Component({
  selector: 'app-cities-table',
  templateUrl: './cities-table.component.html',
  styleUrls: ['./cities-table.component.scss'],
})
export class CitiesTableComponent implements OnInit {
  loadingIndicator: boolean;

  rows: CityDatabaseInterface[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadingIndicator = true;
    this.http
      .get(environment.apiUrl + '/city/get-all')
      .subscribe((val: CityDatabaseInterface[]) => {
        this.rows = val;
        this.loadingIndicator = false;
      });
  }
}
