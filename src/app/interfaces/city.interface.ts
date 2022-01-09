export interface CityDatabaseInterface {
  readonly id: number;
  cityName: string;
  simc: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CityRequestAll {
  result: CityDatabaseInterface[];
  total: number;
  success: boolean;
}

export type CityDatabase = CityDatabaseInterface | { status: 'CityExist' };
