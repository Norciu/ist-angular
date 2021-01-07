import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  CityDatabaseInterface,
  Location,
  LocationAddress,
  LocationOwner,
  TechnologyDatabaseInterface,
} from '../../interfaces';
import { StreetDatabase } from '../../interfaces';
import { LocationService } from '../../services/location/location.service';
import { map, startWith } from 'rxjs/operators';
import { Snacks } from '../../helpers/snacks';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  availableCities: CityDatabaseInterface[];
  filteredCities: Observable<CityDatabaseInterface[]>;
  filteredStreets: Observable<StreetDatabase[]>;
  filteredTechnologies: Observable<TechnologyDatabaseInterface[]>;

  availableStreets: StreetDatabase[];
  availableTechnology: TechnologyDatabaseInterface[];

  currentSimc: string;
  currentUlic: string;

  clientInfo = this.fb.group({
    clientType: this.fb.control(''),
    firstName: this.fb.control(''),
    companyName: this.fb.control(''),
    lastName: this.fb.control(''),
    phoneNo: this.fb.control('', [
      Validators.pattern(
        /(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-68]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}/
      ),
    ]),
    email: this.fb.control('', [Validators.email]),
  });

  addressForm = this.fb.group({
    city: this.fb.control('', [Validators.required]),
    street: this.fb.control('', [Validators.required]),
    flatNo: this.fb.control(''),
    homeNo: this.fb.control('', [Validators.required]),
    plotNo: this.fb.control(''),
  });

  technologyForm = this.fb.group({
    techForm: this.fb.control('', [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private snacks: Snacks
  ) {}

  ngOnInit(): void {
    this._getCities();
    this._getTechnologies();
  }

  set simc(simc: string) {
    this.currentSimc = simc;
  }

  set ulic(ulic: string) {
    this.currentUlic = ulic;
  }

  private _getTechnologies(): void {
    this.locationService
      .getAvailableTechnologies()
      .subscribe((val: TechnologyDatabaseInterface[]) => {
        this.availableTechnology = val;
        this.filteredTechnologies = this.technologyForm.valueChanges.pipe(
          startWith(''),
          map((value) => {
            return this._filterTechnology(value);
          })
        );
      });
  }

  private _getCities(): void {
    this.locationService
      .getAvailableCities()
      .subscribe((val: CityDatabaseInterface[]) => {
        this.availableCities = val;
        this.filteredCities = this.addressForm.get('city').valueChanges.pipe(
          startWith(''),
          map((value) => {
            return this._cityFilter(value);
          })
        );
      });
  }

  private _cityFilter(value: string): CityDatabaseInterface[] {
    const filterValue = value.toLowerCase();
    const res = this.availableCities.filter((val) =>
      val.cityName.toLocaleLowerCase().includes(filterValue)
    );
    return res;
  }

  public findStreetsForCity(simc: string): void {
    this.locationService
      .getStreetsForCity(simc)
      .subscribe((val: StreetDatabase[]) => {
        this.availableStreets = val;
        this.filteredStreets = this.addressForm.get('street').valueChanges.pipe(
          startWith(''),
          map((value) => {
            return this._filterStreets(value);
          })
        );
      });
  }

  private _filterStreets(value: string): StreetDatabase[] {
    const filterValue = value.toLowerCase();
    const res = this.availableStreets.filter((val) =>
      val.streetName.toLocaleLowerCase().includes(filterValue)
    );
    return res;
  }

  private _filterTechnology(value: string): TechnologyDatabaseInterface[] {
    const filterValue = value.toLowerCase();
    const res = this.availableTechnology.filter((val) =>
      val.technologyName.toLocaleLowerCase().includes(filterValue)
    );
    return res;
  }

  public add(): void {
    const data: Location = this._prepareDataToSend();
    this.locationService
      .insertToDatabase(data)
      .subscribe((val: { status: 'Added' }) => {
        if (val.status === 'Added') {
          this.snacks.successInfo('Pomyślnie dodano do bazy!');
        }
      });
  }

  private _prepareDataToSend(): Location {
    const clientType = this.clientInfo.controls.clientType.value;
    const address: LocationAddress = this.addressForm.value;
    address.city = this.currentSimc;
    address.street = this.currentUlic;
    return {
      clientInfo: clientType ? this.clientInfo.value : undefined,
      address,
      technology: this.technologyForm.controls.techForm.value,
    };
  }
}
