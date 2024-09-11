/**
 * United Nation Individual
 */
export interface UnitedNationIndividual {
  dataId: string;
  name: string;
  individualDocuments: {
    TYPE_OF_DOCUMENT: string;
    NUMBER: string;
  }[];
  dateOfBirth: {
    TYPE_OF_DATE: string;
    DATE: string;
  };
  alias: {
    ALIAS_NAME: string;
    QUALITY: string;
  }[];
}
export interface UnitedNationIndividualList {
  individuals: UnitedNationIndividual[];
  totalPage: number;
}

export interface UnitedNationBulkIndividual {
  sourceId: string;
  originalSourceName: string;
  individuals: UnitedNationIndividual[];
}
export interface UnitedNationBulkIndividualList {
  individuals: UnitedNationBulkIndividual[];
  totalPage: number;
}

export interface UnitedNationBulkIndividualPayload {
  firstName: string;
  secondName: string;
  thirdName: string;
  fourthName: string;
  dateOfBirth: string;
  identificationNumber: string;
  alias: string;
}

/**
 * United Nation Entities
 */
export interface UnitedNationEntity {
  dataId: string;
  name: string;
  alias: {
    ALIAS_NAME: string;
    QUALITY: string;
  }[];
}
export interface UnitedNationEntityList {
  entities: UnitedNationEntity[];
  totalPage: number;
}

export interface UnitedNationBulkEntity {
  sourceId: string;
  originalSourceName: string;
  entities: UnitedNationEntity[];
}
export interface UnitedNationBulkEntityList {
  entities: UnitedNationBulkEntity[];
  totalPage: number;
}

export interface UnitedNationBulkEntityPayload {
  name: string;
  alias: string;
}
