import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject, Subscription as Sub } from 'rxjs';
import {
  Location,
  LocationAddress,
  TechnologyDatabaseInterface,
} from '../../interfaces';
import { StreetDatabase } from '../../interfaces';
import { LocationService } from './location.service';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { Snacks } from '../../helpers/snacks';
import { StreetService } from 'src/app/services/street/street.service';
import { AvailableCities } from '../street/street.component';
import { TechnologyService } from '../technology/technology.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  filteredCities: AvailableCities[] = [];
  totalCities: number;

  streets: { result: StreetDatabase[], total: number } = { result: [], total: 0 };

  selectedCity: AvailableCities;
  selectedStreet: StreetDatabase;

  citySearchInput = new Subject<string>();
  streetSearchInput = new Subject<string>();

  availableStreets: StreetDatabase[];
  availableTechnology: TechnologyDatabaseInterface[];
  selectedTechnology: TechnologyDatabaseInterface;

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
    private snacks: Snacks,
    private streetService: StreetService,
    private technologyService: TechnologyService
  ) {}

  ngOnInit(): void {
    this.findCities();
    this.findStreetsForCity();
    this.getTechnologies()
  }

  set selectCity(city: AvailableCities) {
    this.selectedCity = city;
  }

  set simc(simc: string) {
    this.currentSimc = simc;
  }

  set ulic(ulic: string) {
    this.currentUlic = ulic;
  }

  async getTechnologies() {
    const { result } = await this.technologyService.getTechnologies(0,0).toPromise();
    this.availableTechnology = result;
  }

  public findCities() {
    return this.citySearchInput.pipe(debounceTime(500), distinctUntilChanged()).subscribe(async value => {
      const { result, total } = await this.streetService.searchCity(value);
      this.filteredCities = result;
      this.totalCities = total;
    });
  }

  public findStreetsForCity() {
    return this.streetSearchInput.pipe(debounceTime(500), distinctUntilChanged()).subscribe(async value => {
      if (!this.selectedCity) {
        return;
      }
      const { result, total } = await this.streetService.findStreetsForCity(this.selectedCity.id, value);
      this.streets.total = total;
      this.streets.result = result;
    })
  }

  public async add(): Promise<void> {
    const data = this.prepareDataToSend();
    console.warn(data)
    const { success } = await this.locationService.insertToDatabase(data);
    if (success) {
      return this.snacks.successInfo('Pomyślnie dodano do bazy!');
    }

    return this.snacks.dangerInfo('Wystąpił nieoczekiwany błąd!');
  }

  private prepareDataToSend() {
    const t: Location = {
      city_id: this.selectedCity.id,
      city_name: this.selectedCity.cityName,
      street_id: this.selectedStreet.id,
      street_name: this.selectedStreet.streetName,
      flatNo: this.addressForm.get('flatNo').value,
      homeNo: this.addressForm.get('homeNo').value,
      plotNo: this.addressForm.get('plotNo').value,
      technology_id: this.selectedTechnology.id,
    };

    if (this.clientInfo.controls.clientType.value) {
      t.clientInfo = this.clientInfo.value;
    }

    return t;
  }
}
