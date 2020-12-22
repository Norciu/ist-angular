import { Component, OnInit } from '@angular/core';
import { StreetService } from '../../../services/street/street.service';

import { StreetDatabase } from '../../../interfaces/street.interface';

@Component({
  selector: 'app-streets-table',
  templateUrl: './streets-table.component.html',
  styleUrls: ['./streets-table.component.scss'],
})
export class StreetsTableComponent implements OnInit {
  loadingIndicator: boolean;
  rows: StreetDatabase[];

  constructor(private streetService: StreetService) {}

  ngOnInit(): void {
    this.loadingIndicator = true;
    this.streetService.getStreets().subscribe((val: StreetDatabase[]) => {
      this.loadingIndicator = false;
      this.rows = val;
    });
  }
}
