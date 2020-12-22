import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CityService } from './city.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Snacks } from '../../helpers/snacks';
import {CityDatabase} from '../../interfaces/city.interface';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit {
  cityForm = this.fb.group({
    cityName: this.fb.control('', [Validators.required]),
    simc: this.fb.control('', [Validators.required]),
  });


  constructor(
    private fb: FormBuilder,
    private cityService: CityService,
    private router: Router,
    private snacks: Snacks
  ) {}

  ngOnInit(): void {}

  add(): void {
    if (this.validateForm()) {
      this.cityService
        .send(
          this.cityForm.get('cityName').value,
          this.cityForm.get('simc').value
        )
        .pipe(
          catchError((err) => {
            throw new Error(err);
          })
        )
        .subscribe((val) => {
          console.log(val)
          if (val.status === 'Added'){
            this.router.navigate(['/city/add-new']);
            this.snacks.successInfo('Ulica została pomyślnie dodana!');
          } else {
            this.snacks.dangerInfo('Taka ulica już istnieje!');
          }
        });
    }
  }

  private validateForm(): boolean {
    return this.cityForm.valid;
  }

}
