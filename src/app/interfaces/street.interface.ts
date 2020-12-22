import {CityDatabase} from './city.interface';

export interface StreetDatabase {
  readonly id: number;
  streetName: string;
  ulic: string;
  cityId: number;
  createdAt: string;
  updatedAt: string;
  city: CityDatabase[];
};
