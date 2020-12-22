export interface CityDatabaseInterface {
  readonly id: number;
  cityName: string;
  simc: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CityDatabase = CityDatabaseInterface | {status: 'CityExist'};
