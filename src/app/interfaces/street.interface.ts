import {CityDatabase} from './city.interface';

export interface CityStreetData {
  readonly id: number;
  cityName: string;
  postalCode: string;
  simc: string;
  createdAd: Date;
}
export interface StreetDatabase {
  readonly id: number;
  streetName: string;
  ulic: string;
  createdAt: string;
  updatedAt: string;
};
