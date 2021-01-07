import {Component, Input, OnInit} from '@angular/core';
import {TechnologyDatabaseInterface} from '../../../interfaces/technology.interface';

@Component({
  selector: 'app-technology-table',
  templateUrl: './technology-table.component.html',
  styleUrls: ['./technology-table.component.scss']
})
export class TechnologyTableComponent implements OnInit {
  @Input() technologies: TechnologyDatabaseInterface[];

  constructor() { }

  ngOnInit(): void {
  }

}
