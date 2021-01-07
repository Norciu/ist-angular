import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { StreetService } from '../../services/street/street.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Snacks } from '../../helpers/snacks';

export interface AvailableCities {
  id: number;
  cityName: string;
  simc: string;
}

@Component({
  selector: 'app-street',
  templateUrl: './street.component.html',
  styleUrls: ['./street.component.scss'],
})
export class StreetComponent implements OnInit {
  availableCities: AvailableCities[];
  filteredCities: Observable<AvailableCities[]>;
  simc: string;

  streetForm = this.fb.group({
    city: this.fb.control('', [Validators.required]),
    streetName: this.fb.control('', [Validators.required]),
    ulic: this.fb.control('', [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private streetService: StreetService,
    private router: Router,
    private snacks: Snacks
  ) {}

  ngOnInit(): void {
    this.streetService
      .getAvailableCities()
      .toPromise()
      .then((val: AvailableCities[]) => {
        this.availableCities = val;
        this._setErrorIfEmpty();
        this.filteredCities = this.streetForm.get('city').valueChanges.pipe(
          startWith(''),
          map((value) => {
            return this._filter(value);
          })
        );
      });
  }

  private _setErrorIfEmpty(): void {
    if (this.availableCities.length === 0) {
      this.streetForm.controls.city.setErrors({ noCities: true });
    }
  }

  private _filter(value: string): AvailableCities[] {
    const filterValue = value.toLowerCase();
    const res = this.availableCities.filter((val) =>
      val.cityName.toLocaleLowerCase().includes(filterValue)
    );
    return res;
  }

  set citySimc(simc: string) {
    this.simc = simc;
  }

  private _validForms(): boolean {
    return this.streetForm.valid;
  }

  public add(): void {
    if (this._validForms()) {
      const street = this.streetForm.get('streetName').value;
      const ulic = this.streetForm.get('ulic').value;
      this.streetService
        .addStreetToDatabase(this.simc, street, ulic)
        .subscribe((value) => {
          this.router.navigate(['/street/add-new']);
          this.snacks.successInfo('Pomyślnie dodano ulicę!');
        });
    }
  }
}
