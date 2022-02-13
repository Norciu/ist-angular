import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from '../../services/home/home.service';
import { LocationApi } from '../../interfaces';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { MatDialog } from '@angular/material/dialog';
import { CommentsComponent } from './comments/comments.component';
import { TablePagination } from 'src/app/interfaces/any.interface';
import { recordTranslator } from 'src/app/helpers/record_translator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  ColumnMode = ColumnMode;
  loadingIndicator = true;
  rows: LocationApi[];
  timeout: any;
  tempFilter = [];

  recordTranslator = (total: number): string => recordTranslator(total);

  page: TablePagination = { pageNumber: 0, totalElements: 0, size: 10 };

  @ViewChild('homeTable') table: any;

  constructor(private homeService: HomeService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getLocations(10, 0);
  }

  openDialog(locationId: string): void {
    const dialogRef = this.dialog.open(CommentsComponent, {
      width: '500px',
      height: '500px',
      data: { locationId }
    });
  }

  toggleExpandRow(row): void {
    this.table.rowDetail.toggleExpandRow(row);
  }


  onPage(event): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  async setPage(pageInfo): Promise<void> {
    this.loadingIndicator = true;
    await this.homeService.getAllLocations(pageInfo.limit, pageInfo.offset * pageInfo.limit).then(({ result, total, success }) => {
      this.loadingIndicator = false;
      this.rows = result;
      this.page.totalElements = total;
    })
  }

  async getLocations(limit: number, offset: number) {
    this.homeService.getAllLocations(limit, offset).then(({ result, total, success }) => {
      this.loadingIndicator = false;
      this.rows = result;
      this.page.totalElements = total;
    });
  }
}
