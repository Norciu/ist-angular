import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

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
  dataSource = ELEMENT_DATA;
  readonly columns = [
    { name: '#', alias: 'id' },
    { name: 'Miejscowość', alias: 'cityName' },
    { name: 'Ulica', alias: 'streetName' },
    { name: 'Numer porządkowy', alias: 'homeNo' },
    { name: 'echnologia', alias: 'cityName' },
  ];
  readonly tableHeaderColumnsName = [
    '#',
    'Miejscowość',
    'Ulica',
    'Numer porządkowy',
    'Technologia',
  ];
  readonly columnsToDisplay = [
    'id',
    'cityName',
    'streetName',
    'homeNo',
    'technology',
  ];
  expandedElement: PeriodicElement | null;
  constructor() {}

  ngOnInit(): void {}
}
