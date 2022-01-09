import { Component, Input, OnInit } from '@angular/core';
import { TechnologyDatabaseInterface } from '../../../interfaces/technology.interface';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { TechnologyService } from 'src/app/components/technology/technology.service';

@Component({
  selector: 'app-technology-table',
  templateUrl: './technology-table.component.html',
  styleUrls: ['./technology-table.component.scss']
})
export class TechnologyTableComponent implements OnInit {
  rows: TechnologyDatabaseInterface[];

  private loadingIndicator: boolean;

  ColumnMode = ColumnMode;

  page: { pageNumber: number, totalElements: number, size: number } = {
    pageNumber: 0,
    totalElements: 0,
    size: 10,
  }

  constructor(
    private readonly technologyService: TechnologyService
  ) { }

  ngOnInit(): void {
    this.initDataTable();
  }

  initDataTable(): void {
    this.technologyService.getTechnologies().subscribe(({ result, total }) => {
      this.rows = result;
      this.page.totalElements = total;
    })
  }

  async setPage(pageInfo): Promise<void> {
    this.loadingIndicator = true;
    await this.technologyService.getTechnologies(pageInfo.limit, pageInfo.offset * pageInfo.limit).subscribe(({ result, total }) => {
      this.loadingIndicator = false;
      this.rows = result;
      this.page.totalElements = total;
    })
  }

}
