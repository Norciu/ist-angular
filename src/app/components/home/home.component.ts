import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {CookieService} from 'ngx-cookie-service';

export interface PeriodicElement {
  id: number;
  cityName: string;
  streetName: string;
  homeNo: string;
  technology: string;
  description: { str: string };
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    cityName: 'Wola',
    streetName: 'Przemysłowa',
    homeNo: '23/42',
    technology: 'Świtłowooody',
    description: { str: 'asdas' },
  },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' }
  ];
  columns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company' }]

  ngOnInit(): void {}
}
