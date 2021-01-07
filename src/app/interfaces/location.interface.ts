export interface Location {
  clientInfo?: LocationOwner;
  address: LocationAddress;
  technology: string;
}

export interface LocationAddress {
  city: string;
  street: string;
  flatNo?: string;
  homeNo: string;
  plotNo?: string;
}

export type LocationOwner = LocationOwnerCompany | LocationOwnerPerson;

export interface LocationOwnerCompany{
  clientType?: 2;
  companyName?: string;
  firstName?: string;
  lastName?: string;
  phoneNo?: string;
  email?: string;
}

export interface LocationOwnerPerson {
  clientType?: 1;
  firstName?: string;
  lastName?: string;
  phoneNo?: string;
  email?: string;
}

export interface LocationApi {
  id: number;
  availableTechnology: {
    id: number;
    technologyName: string;
    createdAt: Date;
    updatedAt: Date;
  };
  street: {
    id: number;
    streetName: string;
    ulic: string;
    createdAt: string;
    updatedAt: string;
    city: {
      id: number;
      cityName: string;
      postalCode: string;
      simc: string;
      createdAt: Date;
      updatedAt: Date;
    }
  };
  location_owner: {
    id: string;
    clientType: number;
    firstName: string;
    lastName: string;
    companyName: string;
    phoneNo: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
  flatNo: string | null;
  homeNo: string;
  plot_no: string;
  createdAt: Date;
  updatedAt: Date;
}
