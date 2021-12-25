import { Component, OnInit, Input } from '@angular/core';
import { StreetService } from '../../../services/street/street.service';
import { ColumnMode } from '@swimlane/ngx-datatable';

import { StreetDatabase } from '../../../interfaces/street.interface';

@Component({
  selector: 'app-streets-table',
  templateUrl: './streets-table.component.html',
  styleUrls: ['./streets-table.component.scss'],
})
export class StreetsTableComponent implements OnInit {
  @Input() selectedCityStreets: StreetDatabase[];
  @Input() selectedCityStreetsTotal: number;
  loadingIndicator: boolean;
  rows: StreetDatabase[];
  ColumnMode = ColumnMode;

  page: { pageNumber: number, totalElements: number, size: number } = {
    pageNumber: 0,
    totalElements: 0,
    size: 10,
  }

  constructor(private streetService: StreetService) {}

  ngOnInit(): void {
    this.loadingIndicator = true;
    this.streetService.getStreets().subscribe(({ result, total }) => {
      this.loadingIndicator = false;
      this.rows = result;
      this.page.totalElements = total;
    });
  }

  async setPage(pageInfo): Promise<void> {
    this.loadingIndicator = true;
    await this.streetService.getStreets(pageInfo.limit, pageInfo.offset * pageInfo.limit).subscribe(({ result, total }) => {
      this.loadingIndicator = false;
      this.rows = result;
      this.page.totalElements = total;
    })
  }
}
