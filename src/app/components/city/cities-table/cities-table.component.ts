import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CityDatabaseInterface } from '../../../interfaces';
import { CityService } from '../city.service';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-cities-table',
  templateUrl: './cities-table.component.html',
  styleUrls: ['./cities-table.component.scss'],
})
export class CitiesTableComponent implements OnInit {
  loadingIndicator = true;
  ColumnMode = ColumnMode;

  rows: CityDatabaseInterface[];

  page: { pageNumber: number, totalElements: number, size: number } = {
    pageNumber: 0,
    totalElements: 0,
    size: 10,
  }

  constructor(
    private http: HttpClient,
    private cityService: CityService,
    ) {}

  ngOnInit(): void {
    this.cityService.getAll().subscribe(({ result, total }) => {
      this.loadingIndicator = false;
      this.rows = result;
      this.page.totalElements = total;
    })
  }

  setPage(pageInfo) {
    this.loadingIndicator = true;
    this.cityService.getAll(pageInfo.limit, pageInfo.offset * pageInfo.limit).subscribe(({ result, total }) => {
      this.loadingIndicator = false;
      this.rows = result;
      this.page.totalElements = total;
    })
  }
}
