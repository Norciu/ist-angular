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

  // filterTable(event): void {
  //   const val = event.target.value.toLowerCase();
  //   const split = val.split(/,?\s|\s/, 2);
  //   console.log(split);
  //   this.locations = this.tempFilter.filter((value: LocationApi) => {
  //     if (split.length === 2) {
  //       return (
  //         value.street.city.cityName.toLowerCase().indexOf(split[0]) !== -1 &&
  //         value.street.streetName.toLowerCase().indexOf(split[1]) !== -1
  //       );
  //     } else if (split.length === 1) {
  //       return (
  //         value.street.city.cityName.toLowerCase().indexOf(val) !== -1 ||
  //         value.street.streetName.toLowerCase().indexOf(val) !== -1
  //       );
  //     }
  //   });
  //   this.table2.offset = 0;
  // }

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

  async findStreetsForCity() {
    return 
  }
}
