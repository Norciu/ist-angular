import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { StreetService } from '../../services/street/street.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Snacks } from '../../helpers/snacks';

export interface AvailableCities {
  id: number;
  cityName: string;
  postalCode: string;
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
  selectedCity: { [p: string]: string }
  simc: string;

  citySearchInput = new Subject<string>();
  citySearchTotal: number;

  streetForm = this.fb.group({
    city: this.fb.control('', [Validators.required]),
    streetName: this.fb.control('', [Validators.required]),
    ulic: this.fb.control('', [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private streetService: StreetService,
    private router: Router,
    private snacks: Snacks
  ) {}

  ngOnInit(): void {
    this.searchCity();
  }

  private _validForms(): boolean {
    return this.streetForm.valid;
  }

  set selectCity(city: { [p: string]: string }) {
    this.selectedCity = city;
    this.findStreets(city.id);
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

  public searchCity(): Subscription {
  return this.citySearchInput.pipe(debounceTime(500), distinctUntilChanged()).subscribe(async value => {
      const { result, total } = await this.streetService.searchCity(value);
      this.availableCities = result;
      this.citySearchTotal = total;
    });
  }

  public async findStreets(id) {
    const { result, total } = await this.streetService.getStreetsForCity(id);
    this.availableCities = result;
    this.citySearchTotal = total;
  }
}
