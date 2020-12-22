import { Component, OnInit } from '@angular/core';
import {
  HomeService,
  LocationsApiData,
} from '../../services/home/home.service';
import {catchError} from 'rxjs/operators';

export interface PeriodicElement {
  id: number;
  cityName: string;
  streetName: string;
  homeNo: string;
  technology: string;
  description: { str: string };
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // animations: [
  //   trigger('detailExpand', [
  //     state('collapsed', style({ height: '0px', minHeight: '0' })),
  //     state('expanded', style({ height: '*' })),
  //     transition(
  //       'expanded <=> collapsed',
  //       animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
  //     ),
  //   ]),
  // ],
})
export class HomeComponent implements OnInit {
  loadingIndicator: boolean;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.loadingIndicator = true;
    this.homeService
      .getAllAvailableLocations()
      .pipe(catchError(err => {
        throw new Error(err);
      }))
      .subscribe((val: { locations: LocationsApiData[] }) => {
        console.log(val)
      });
  }
}
