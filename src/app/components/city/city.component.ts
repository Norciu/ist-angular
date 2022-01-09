import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CityService } from './city.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Snacks } from '../../helpers/snacks';
import { CitiesTableComponent } from './cities-table/cities-table.component';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit {
  cityForm = this.fb.group({
    cityName: this.fb.control('', [Validators.required]),
    postalCode: this.fb.control('', [
      Validators.required,
      Validators.pattern(/[0-9]{2}-[0-9]{3}/),
    ]),
    simc: this.fb.control('', [Validators.required]),
  });

  @ViewChild(CitiesTableComponent) ctc: CitiesTableComponent;

  constructor(
    private fb: FormBuilder,
    private cityService: CityService,
    private snacks: Snacks
  ) {}

  ngOnInit(): void {}

  add(): void {
    if (this.validateForm()) {
      this.cityService
        .send(
          this.cityForm.get('cityName').value,
          this.cityForm.get('postalCode').value,
          this.cityForm.get('simc').value
        )
        .pipe(
          catchError((err) => {
            throw new Error(err);
          })
        )
        .subscribe(({ result, total, inserted, success }) => {
          if (success) {
            this.snacks.successInfo('Miejscowość została pomyślnie dodana!');
            this.ctc.page.totalElements = total;
          } else {
            this.snacks.dangerInfo('Taka miejscowość już istnieje!');
          }
        });
    }
  }

  private validateForm(): boolean {
    return this.cityForm.valid;
  }
}
