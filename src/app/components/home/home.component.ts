import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from '../../services/home/home.service';
import { LocationApi } from '../../interfaces';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { MatDialog } from '@angular/material/dialog';
import { CommentsComponent } from './comments/comments.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loadingIndicator: boolean;
  locations: LocationApi[];
  timeout: any;
  tempFilter = [];

  @ViewChild('homeTable') table: any;
  @ViewChild(DatatableComponent) table2: DatatableComponent;

  constructor(private homeService: HomeService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadingIndicator = true;
    this.homeService
      .getAllAvailableLocations()
      .subscribe((val: LocationApi[]) => {
        this.tempFilter = [...val];
        this.locations = val;
        this.loadingIndicator = false;
      });
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

  filterTable(event): void {
    const val = event.target.value.toLowerCase();
    const split = val.split(/,?\s|\s/, 2);
    console.log(split);
    this.locations = this.tempFilter.filter((value: LocationApi) => {
      if (split.length === 2) {
        return (
          value.street.city.cityName.toLowerCase().indexOf(split[0]) !== -1 &&
          value.street.streetName.toLowerCase().indexOf(split[1]) !== -1
        );
      } else if (split.length === 1) {
        return (
          value.street.city.cityName.toLowerCase().indexOf(val) !== -1 ||
          value.street.streetName.toLowerCase().indexOf(val) !== -1
        );
      }
    });
    this.table2.offset = 0;
  }
}
