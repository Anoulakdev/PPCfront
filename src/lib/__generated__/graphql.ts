/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AcknowlegeData = {
  __typename?: 'AcknowlegeData';
  customerId?: Maybe<Customer>;
  updateTime?: Maybe<Scalars['DateTime']>;
  userId?: Maybe<User>;
};

export type ActiveStorage = {
  __typename?: 'ActiveStorage';
  amount: Scalars['Float'];
  average: Scalars['Float'];
};

export type ActiveStorageInput = {
  amount: Scalars['Float'];
  average: Scalars['Float'];
};

export type Address = {
  __typename?: 'Address';
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type Chart = {
  __typename?: 'Chart';
  declarations: Array<Maybe<Scalars['Int']>>;
  dispatchs: Array<Maybe<Scalars['Int']>>;
  labels: Array<Scalars['Float']>;
  max: Scalars['Float'];
  min: Scalars['Float'];
};

export type Condition = {
  field?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type Country = {
  __typename?: 'Country';
  _id: Scalars['ID'];
  countryCode: Scalars['String'];
  countryId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  enName: Scalars['String'];
  laName: Scalars['String'];
  phoneCode: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CreateAddressInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateCountryInput = {
  countryCode: Scalars['String'];
  enName: Scalars['String'];
  laName: Scalars['String'];
  phoneCode: Scalars['String'];
};

export type CreateCustomerInput = {
  abbreviation: Scalars['String'];
  address: Scalars['String'];
  company: Scalars['String'];
  deadLevel: Scalars['Float'];
  email?: InputMaybe<Scalars['String']>;
  floodLevel: Scalars['Float'];
  fullLevel: Scalars['Float'];
  minimumLevel: Scalars['Float'];
  name: Scalars['String'];
  phone: Scalars['String'];
  totalActiveStorage: Scalars['Float'];
  unit: Scalars['Int'];
  villageId?: InputMaybe<Scalars['String']>;
};

export type CreateDayPowerPurchaseInput = {
  customerId: Scalars['String'];
  machinesAvailability: MachinesAvailabilityInput;
  powerDetail: Array<PowerDetailInput>;
  powers: Array<Scalars['String']>;
  remark?: InputMaybe<Scalars['String']>;
  remarks: Array<Scalars['String']>;
  reservoirSituation: ReservoirSituationInput;
  waterDischarge: WaterDischargeInput;
};

export type CreateDeclarationInput = {
  name: Scalars['String'];
  powers: Array<Scalars['String']>;
  remarks: Array<Scalars['String']>;
  units: Array<UnitDataInput>;
};

export type CreateDispatchInput = {
  name: Scalars['String'];
  powers: Array<Scalars['String']>;
  remarks: Array<Scalars['String']>;
  units: Array<UnitDataInput>;
};

export type CreateDistrictInput = {
  districtCode?: InputMaybe<Scalars['String']>;
  enName: Scalars['String'];
  laName: Scalars['String'];
  provinceId: Scalars['String'];
};

export type CreateDocumentInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateMonthPowerPurchaseInput = {
  customerId: Scalars['String'];
  powerDetail: Array<PowerDetailInput>;
  powers: Array<Scalars['String']>;
  remark?: InputMaybe<Scalars['String']>;
  remarks: Array<Scalars['String']>;
};

export type CreateProvinceInput = {
  abbLetters?: InputMaybe<Scalars['String']>;
  countryId: Scalars['String'];
  enName: Scalars['String'];
  laName: Scalars['String'];
  provinceCode: Scalars['String'];
};

export type CreateReportInput = {
  activeStorage: ActiveStorageInput;
  customerId: Scalars['String'];
  dwf: Scalars['Float'];
  dwy: Scalars['Float'];
  inflow: InflowInput;
  netEnergyOutput: Scalars['Float'];
  otherWaterReleased: OtherWaterReleasedInput;
  outFlow: OutFlowInput;
  powerDetail: Array<PowerDetailInput>;
  powers: Array<Scalars['String']>;
  pws: Scalars['Float'];
  rainFall: Scalars['Float'];
  remark?: InputMaybe<Scalars['String']>;
  remarks: Array<Scalars['String']>;
  spillWay: SpillWayInput;
  waterLevel: Scalars['Float'];
  waterRate: Scalars['Float'];
};

export type CreateRoleInput = {
  name: Scalars['String'];
  paths: Array<Scalars['String']>;
  permissions: Array<Scalars['String']>;
};

export type CreateStatusInput = {
  enName: Scalars['String'];
  laName: Scalars['String'];
};

export type CreateUserInput = {
  conFirmPassword: Scalars['String'];
  customerId: Scalars['String'];
  customers: Array<Scalars['String']>;
  email: Scalars['String'];
  fName: Scalars['String'];
  lName: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  roleId: Scalars['String'];
};

export type CreateVillageInput = {
  districtId: Scalars['String'];
  enName: Scalars['String'];
  laName: Scalars['String'];
  villageCode?: InputMaybe<Scalars['String']>;
};

export type CreateWeekPowerPurchaseInput = {
  customerId: Scalars['String'];
  powerDetail: Array<PowerDetailInput>;
  powers: Array<Scalars['String']>;
  remark?: InputMaybe<Scalars['String']>;
  remarks: Array<Scalars['String']>;
};

export type Customer = {
  __typename?: 'Customer';
  _id: Scalars['ID'];
  abbreviation: Scalars['String'];
  address: Scalars['String'];
  company: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deadLevel: Scalars['Float'];
  email: Scalars['String'];
  floodLevel: Scalars['Float'];
  fullLevel: Scalars['Float'];
  logo?: Maybe<Scalars['String']>;
  minimumLevel: Scalars['Float'];
  name: Scalars['String'];
  phone: Scalars['String'];
  totalActiveStorage: Scalars['Float'];
  type: Scalars['Int'];
  unit: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  villageId?: Maybe<Village>;
};

export type DailyReport = {
  __typename?: 'DailyReport';
  _id: Scalars['ID'];
  activeStorage: ActiveStorage;
  createdAt: Scalars['DateTime'];
  decCustomerId: Customer;
  decUserId: User;
  disCustomerId: Customer;
  disUserId?: Maybe<User>;
  dwf: Scalars['Float'];
  dwy: Scalars['Float'];
  edited: Scalars['Boolean'];
  inflow: Inflow;
  netEnergyOutput: Scalars['Float'];
  otherWaterReleased: OtherWaterReleased;
  outFlow: OutFlow;
  powerDetail: Array<PowerDetailData>;
  powerNo: Scalars['String'];
  powers: Array<Scalars['String']>;
  pws: Scalars['Float'];
  rainFall: Scalars['Float'];
  remark?: Maybe<Scalars['String']>;
  remarks: Array<Scalars['String']>;
  reportId: Scalars['Int'];
  spillWay: SpillWay;
  totalPower: Scalars['Float'];
  totalUnit: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  waterLevel: Scalars['Float'];
  waterRate: Scalars['Float'];
};

export type DateFillter = {
  endDate: Scalars['String'];
  startDate: Scalars['String'];
};

export type DayPowerPurchase = {
  __typename?: 'DayPowerPurchase';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  dayId: Scalars['Int'];
  decAcknowleged: Scalars['Boolean'];
  decAcknowlegedDetail?: Maybe<Array<Maybe<AcknowlegeData>>>;
  decCustomerId: Customer;
  decUserId: User;
  disAcknowleged: Scalars['Boolean'];
  disAcknowlegedDetail?: Maybe<Array<Maybe<AcknowlegeData>>>;
  disCustomerId: Customer;
  disUserId?: Maybe<User>;
  edited: Scalars['Boolean'];
  edits?: Maybe<Array<Maybe<EditData>>>;
  machinesAvailability: MachinesAvailabilityData;
  originalDetail: OriginalDetail;
  powerDetail: Array<PowerDetailData>;
  powerNo: Scalars['String'];
  powers: Array<Scalars['String']>;
  price: Scalars['Float'];
  remark?: Maybe<Scalars['String']>;
  remarks: Array<Scalars['String']>;
  reservoirSituation: ReservoirSituationData;
  totalPower: Scalars['Float'];
  totalUnit: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  waterDischarge: WaterDischargeData;
};

export type DayReport = {
  __typename?: 'DayReport';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  dayId: Scalars['Int'];
  powerNo: Scalars['String'];
  powers: Array<Scalars['Int']>;
  remark?: Maybe<Scalars['String']>;
  remarks: Array<Scalars['String']>;
  totalPower: Scalars['Float'];
  totalUnit: Scalars['Float'];
};

export type Declaration = {
  __typename?: 'Declaration';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  customerId: Customer;
  decId: Scalars['Int'];
  name: Scalars['String'];
  powers: Array<Scalars['String']>;
  remarks: Array<Scalars['String']>;
  type: Scalars['Int'];
  units: Array<UnitData>;
  update: Array<UpdateData>;
  updatedAt: Scalars['DateTime'];
  userId: User;
};

export type DescriptionWaterDischargeData = {
  __typename?: 'DescriptionWaterDischargeData';
  amount: Scalars['Float'];
  average: Scalars['Float'];
};

export type DescriptionWaterDischargeInput = {
  amount: Scalars['Float'];
  average: Scalars['Float'];
};

export type Dispatch = {
  __typename?: 'Dispatch';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  customerId: Customer;
  disId: Scalars['Int'];
  name: Scalars['String'];
  powers: Array<Scalars['String']>;
  remarks: Array<Scalars['String']>;
  type: Scalars['Int'];
  units: Array<UnitData>;
  update: Array<UpdateData>;
  updatedAt: Scalars['DateTime'];
  userId: User;
};

export type District = {
  __typename?: 'District';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  districtCode?: Maybe<Scalars['String']>;
  districtId?: Maybe<Scalars['Int']>;
  enName: Scalars['String'];
  laName: Scalars['String'];
  provinceId: Province;
  updatedAt: Scalars['DateTime'];
};

export type Document = {
  __typename?: 'Document';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  decAcknowleged: Scalars['Boolean'];
  declaration: Scalars['String'];
  disAcknowleged: Scalars['Boolean'];
  dis_dec: Scalars['String'];
  dispatch: Scalars['String'];
  edited: Scalars['Boolean'];
  powerNo: Scalars['String'];
};

export type EditData = {
  __typename?: 'EditData';
  customerId?: Maybe<Customer>;
  dayEditId?: Maybe<EditDayPowerPurchase>;
  updateTime?: Maybe<Scalars['DateTime']>;
  userId?: Maybe<User>;
};

export type EditDayPowerPurchase = {
  __typename?: 'EditDayPowerPurchase';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  customerId: Customer;
  dayPP: Scalars['String'];
  powerDetail: Array<PowerDetailData>;
  powers: Array<Scalars['String']>;
  price: Scalars['Float'];
  remark?: Maybe<Scalars['String']>;
  remarks: Array<Scalars['String']>;
  totalPower: Scalars['Float'];
  totalUnit: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  userId: User;
};

export type EditMonthPowerPurchase = {
  __typename?: 'EditMonthPowerPurchase';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  customerId: Customer;
  dayPP: Scalars['String'];
  powerDetail: Array<PowerDetailData>;
  powers: Array<Scalars['String']>;
  price: Scalars['Float'];
  remark?: Maybe<Scalars['String']>;
  remarks: Array<Scalars['String']>;
  totalPower: Scalars['Float'];
  totalUnit: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  userId: User;
};

export type EditWeekPowerPurchase = {
  __typename?: 'EditWeekPowerPurchase';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  customerId: Customer;
  dayPP: Scalars['String'];
  powerDetail: Array<PowerDetailData>;
  powers: Array<Scalars['String']>;
  price: Scalars['Float'];
  remark?: Maybe<Scalars['String']>;
  remarks: Array<Scalars['String']>;
  totalPower: Scalars['Float'];
  totalUnit: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  userId: User;
};

export type Inflow = {
  __typename?: 'Inflow';
  amount: Scalars['Float'];
  volume: Scalars['Float'];
};

export type InflowInput = {
  amount: Scalars['Float'];
  volume: Scalars['Float'];
};

export type Login = {
  __typename?: 'Login';
  accessToken: Scalars['String'];
  data: User;
};

export type LoginInput = {
  password: Scalars['String'];
  user: Scalars['String'];
};

export type MachinesAvailabilityData = {
  __typename?: 'MachinesAvailabilityData';
  maxs: Array<Scalars['Float']>;
  mins: Array<Scalars['Float']>;
};

export type MachinesAvailabilityInput = {
  maxs: Array<Scalars['Float']>;
  mins: Array<Scalars['Float']>;
};

export type MonthPowerPurchase = {
  __typename?: 'MonthPowerPurchase';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  decAcknowleged: Scalars['Boolean'];
  decAcknowlegedDetail?: Maybe<Array<Maybe<AcknowlegeData>>>;
  decCustomerId: Customer;
  decUserId: User;
  disAcknowleged: Scalars['Boolean'];
  disAcknowlegedDetail?: Maybe<Array<Maybe<AcknowlegeData>>>;
  disCustomerId: Customer;
  disUserId?: Maybe<User>;
  edited: Scalars['Boolean'];
  edits?: Maybe<Array<Maybe<EditData>>>;
  monthId: Scalars['Int'];
  originalDetail: OriginalDetail;
  powerDetail: Array<PowerDetailData>;
  powerNo: Scalars['String'];
  powers: Array<Scalars['String']>;
  price: Scalars['Float'];
  remark?: Maybe<Scalars['String']>;
  remarks: Array<Scalars['String']>;
  totalPower: Scalars['Float'];
  totalUnit: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acknowledgedDayDeclaration: DayPowerPurchase;
  acknowledgedDayDispatch: DayPowerPurchase;
  acknowledgedMonthDeclaration: MonthPowerPurchase;
  acknowledgedMonthDispatch: MonthPowerPurchase;
  acknowledgedWeekDeclaration: WeekPowerPurchase;
  acknowledgedWeekDispatch: WeekPowerPurchase;
  createAddress: Address;
  createCountry: Country;
  createCustomer: Customer;
  createDayDeclaration: DayPowerPurchase;
  createDeclaration: Declaration;
  createDispatch: Dispatch;
  createDistrict: District;
  createDocument: Document;
  createMonthPowerPurchase: MonthPowerPurchase;
  createProvince: Province;
  createReport: DailyReport;
  createRole: Role;
  createStatus: Status;
  createUser: User;
  createVillage: Village;
  createWeekPowerPurchase: WeekPowerPurchase;
  login: Login;
  removeAddress: Address;
  removeCountry: Country;
  removeCustomer: Customer;
  removeDayPowerPurchase: DayPowerPurchase;
  removeDeclaration: Declaration;
  removeDispatch: Dispatch;
  removeDistrict: District;
  removeDocument: Document;
  removeEditDayPowerPurchase: EditDayPowerPurchase;
  removeEditMonthPowerPurchase: EditMonthPowerPurchase;
  removeEditWeekPowerPurchase: EditWeekPowerPurchase;
  removeMonthPowerPurchase: MonthPowerPurchase;
  removeProvince: Province;
  removeReport: DailyReport;
  removeRole: Role;
  removeStatus: Status;
  removeUser: User;
  removeVillage: Village;
  removeWeekPowerPurchase: WeekPowerPurchase;
  searchCustomer: Array<Maybe<Customer>>;
  updateAddress: Address;
  updateCountry: Country;
  updateCustomer: Customer;
  updateDeclaration: Declaration;
  updateDispatch: Dispatch;
  updateDistrict: District;
  updateDocument: Document;
  updateEditDayPowerPurchase: EditDayPowerPurchase;
  updateEditMonthPowerPurchase: EditMonthPowerPurchase;
  updateEditWeekPowerPurchase: EditWeekPowerPurchase;
  updateMonthPowerPurchase: MonthPowerPurchase;
  updateProvince: Province;
  updateReport: DailyReport;
  updateRole: Role;
  updateStatus: Status;
  updateUser: User;
  updateVillage: Village;
  updateWeekPowerPurchase: WeekPowerPurchase;
};


export type MutationAcknowledgedDayDeclarationArgs = {
  acknowledgedDayDeclarationInput: UpdateDayPowerPurchaseInput;
};


export type MutationAcknowledgedDayDispatchArgs = {
  acknowledgedDayDispatchInput: UpdateDayPowerPurchaseInput;
};


export type MutationAcknowledgedMonthDeclarationArgs = {
  acknowledgedMonthDeclaration: UpdateMonthPowerPurchaseInput;
};


export type MutationAcknowledgedMonthDispatchArgs = {
  acknowledgedMonthDispatch: UpdateMonthPowerPurchaseInput;
};


export type MutationAcknowledgedWeekDeclarationArgs = {
  acknowledgedWeekDeclaration: UpdateWeekPowerPurchaseInput;
};


export type MutationAcknowledgedWeekDispatchArgs = {
  acknowledgedWeekDispatch: UpdateWeekPowerPurchaseInput;
};


export type MutationCreateAddressArgs = {
  createAddressInput: CreateAddressInput;
};


export type MutationCreateCountryArgs = {
  createCountryInput: CreateCountryInput;
};


export type MutationCreateCustomerArgs = {
  createCustomerInput: CreateCustomerInput;
};


export type MutationCreateDayDeclarationArgs = {
  createDayDeclarationInput: CreateDayPowerPurchaseInput;
};


export type MutationCreateDeclarationArgs = {
  createDeclarationInput: CreateDeclarationInput;
};


export type MutationCreateDispatchArgs = {
  createDispatchInput: CreateDispatchInput;
};


export type MutationCreateDistrictArgs = {
  createDistrictInput: CreateDistrictInput;
};


export type MutationCreateDocumentArgs = {
  createDocumentInput: CreateDocumentInput;
};


export type MutationCreateMonthPowerPurchaseArgs = {
  createMonthPowerPurchaseInput: CreateMonthPowerPurchaseInput;
};


export type MutationCreateProvinceArgs = {
  createProvinceInput: CreateProvinceInput;
};


export type MutationCreateReportArgs = {
  createReportInput: CreateReportInput;
};


export type MutationCreateRoleArgs = {
  createRoleInput: CreateRoleInput;
};


export type MutationCreateStatusArgs = {
  createStatusInput: CreateStatusInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationCreateVillageArgs = {
  createVillageInput: CreateVillageInput;
};


export type MutationCreateWeekPowerPurchaseArgs = {
  createWeekPowerPurchaseInput: CreateWeekPowerPurchaseInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRemoveAddressArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveCountryArgs = {
  id: Scalars['String'];
};


export type MutationRemoveCustomerArgs = {
  id: Scalars['String'];
};


export type MutationRemoveDayPowerPurchaseArgs = {
  id: Scalars['String'];
};


export type MutationRemoveDeclarationArgs = {
  id: Scalars['String'];
};


export type MutationRemoveDispatchArgs = {
  id: Scalars['String'];
};


export type MutationRemoveDistrictArgs = {
  id: Scalars['String'];
};


export type MutationRemoveDocumentArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveEditDayPowerPurchaseArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveEditMonthPowerPurchaseArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveEditWeekPowerPurchaseArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveMonthPowerPurchaseArgs = {
  id: Scalars['String'];
};


export type MutationRemoveProvinceArgs = {
  id: Scalars['String'];
};


export type MutationRemoveReportArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveRoleArgs = {
  id: Scalars['String'];
};


export type MutationRemoveStatusArgs = {
  id: Scalars['String'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['String'];
};


export type MutationRemoveVillageArgs = {
  id: Scalars['String'];
};


export type MutationRemoveWeekPowerPurchaseArgs = {
  id: Scalars['String'];
};


export type MutationSearchCustomerArgs = {
  keyword: Scalars['String'];
};


export type MutationUpdateAddressArgs = {
  updateAddressInput: UpdateAddressInput;
};


export type MutationUpdateCountryArgs = {
  updateCountryInput: UpdateCountryInput;
};


export type MutationUpdateCustomerArgs = {
  updateCustomerInput: UpdateCustomerInput;
};


export type MutationUpdateDeclarationArgs = {
  updateDeclarationInput: UpdateDeclarationInput;
};


export type MutationUpdateDispatchArgs = {
  updateDispatchInput: UpdateDispatchInput;
};


export type MutationUpdateDistrictArgs = {
  updateDistrictInput: UpdateDistrictInput;
};


export type MutationUpdateDocumentArgs = {
  updateDocumentInput: UpdateDocumentInput;
};


export type MutationUpdateEditDayPowerPurchaseArgs = {
  updateEditDayPowerPurchaseInput: UpdateEditDayPowerPurchaseInput;
};


export type MutationUpdateEditMonthPowerPurchaseArgs = {
  updateEditMonthPowerPurchaseInput: UpdateEditMonthPowerPurchaseInput;
};


export type MutationUpdateEditWeekPowerPurchaseArgs = {
  updateEditWeekPowerPurchaseInput: UpdateEditWeekPowerPurchaseInput;
};


export type MutationUpdateMonthPowerPurchaseArgs = {
  updateMonthPowerPurchaseInput: UpdateMonthPowerPurchaseInput;
};


export type MutationUpdateProvinceArgs = {
  updateProvinceInput: UpdateProvinceInput;
};


export type MutationUpdateReportArgs = {
  updateReportInput: UpdateReportInput;
};


export type MutationUpdateRoleArgs = {
  updateRoleInput: UpdateRoleInput;
};


export type MutationUpdateStatusArgs = {
  updateStatusInput: UpdateStatusInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationUpdateVillageArgs = {
  updateVillageInput: UpdateVillageInput;
};


export type MutationUpdateWeekPowerPurchaseArgs = {
  updateWeekPowerPurchaseInput: UpdateWeekPowerPurchaseInput;
};

export type OriginalDetail = {
  __typename?: 'OriginalDetail';
  details: Array<PowerDetailData>;
  powers: Array<Scalars['String']>;
  remarks: Array<Maybe<Scalars['String']>>;
  totalPower: Scalars['Float'];
  totalUnit: Scalars['Float'];
};

export type OtherWaterReleased = {
  __typename?: 'OtherWaterReleased';
  amount: Scalars['Float'];
  volume: Scalars['Float'];
};

export type OtherWaterReleasedInput = {
  amount: Scalars['Float'];
  volume: Scalars['Float'];
};

export type OutFlow = {
  __typename?: 'OutFlow';
  amount: Scalars['Float'];
  volume: Scalars['Float'];
};

export type OutFlowInput = {
  amount: Scalars['Float'];
  volume: Scalars['Float'];
};

export type Pageginate = {
  limit?: Scalars['Int'];
  page?: Scalars['Int'];
};

export type PowerDetailData = {
  __typename?: 'PowerDetailData';
  powers: Array<Scalars['String']>;
  title: Scalars['String'];
};

export type PowerDetailInput = {
  powers: Array<Scalars['String']>;
  title: Scalars['String'];
};

export type Province = {
  __typename?: 'Province';
  _id: Scalars['ID'];
  abbLetters?: Maybe<Scalars['String']>;
  countryId?: Maybe<Country>;
  createdAt: Scalars['DateTime'];
  enName: Scalars['String'];
  laName: Scalars['String'];
  provinceCode: Scalars['String'];
  provinceId?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  address: Address;
  allDocument: Array<Maybe<DayPowerPurchase>>;
  allWeeklyDocument: Array<Maybe<WeekPowerPurchase>>;
  chart: Chart;
  country?: Maybe<Country>;
  countrys: Array<Maybe<Country>>;
  customer: Customer;
  customerSelections: Array<Maybe<Customer>>;
  customers: Array<Maybe<Customer>>;
  dayDeclarations: Array<Maybe<DayPowerPurchase>>;
  dayDispatchs: Array<Maybe<DayPowerPurchase>>;
  dayPowerPurchase?: Maybe<DayPowerPurchase>;
  dayReport: Array<Maybe<DayReport>>;
  declaration?: Maybe<Declaration>;
  declarations: Array<Maybe<Declaration>>;
  dispatch?: Maybe<Dispatch>;
  dispatchs: Array<Maybe<Dispatch>>;
  district?: Maybe<District>;
  districts: Array<Maybe<District>>;
  document: Document;
  documents: Array<Maybe<Document>>;
  editDayPowerPurchase: EditDayPowerPurchase;
  editMonthPowerPurchase: EditMonthPowerPurchase;
  editWeekPowerPurchase: EditWeekPowerPurchase;
  getPowerSources: Array<Maybe<Customer>>;
  getReportYesterDay?: Maybe<ResYesterday>;
  me?: Maybe<Login>;
  monthDeclarations: Array<Maybe<MonthPowerPurchase>>;
  monthDispatchs: Array<Maybe<MonthPowerPurchase>>;
  monthPowerPurchase: MonthPowerPurchase;
  monthSummaryEnergy?: Maybe<SummaryEnergy>;
  ping: Scalars['String'];
  province?: Maybe<Province>;
  provinces: Array<Maybe<Province>>;
  report: DailyReport;
  reports: Array<Maybe<DailyReport>>;
  role: Role;
  roles: Array<Maybe<Role>>;
  status?: Maybe<Status>;
  statuss: Array<Maybe<Status>>;
  summaryEnergy?: Maybe<SummaryEnergy>;
  user?: Maybe<User>;
  users: Array<Maybe<User>>;
  village?: Maybe<Village>;
  villages: Array<Maybe<Village>>;
  weekDeclarations: Array<Maybe<WeekPowerPurchase>>;
  weekDispatchs: Array<Maybe<WeekPowerPurchase>>;
  weekPowerPurchase: WeekPowerPurchase;
  weekSummaryEnergy?: Maybe<SummaryEnergy>;
};


export type QueryAddressArgs = {
  id: Scalars['Int'];
};


export type QueryAllDocumentArgs = {
  queryInput?: InputMaybe<QueryInput>;
};


export type QueryAllWeeklyDocumentArgs = {
  queryInput?: InputMaybe<QueryInput>;
};


export type QueryChartArgs = {
  queryInput?: InputMaybe<QueryInput>;
};


export type QueryCountryArgs = {
  id: Scalars['String'];
};


export type QueryCountrysArgs = {
  queryInput?: InputMaybe<QueryInput>;
};


export type QueryCustomerArgs = {
  id: Scalars['String'];
};


export type QueryCustomersArgs = {
  queryInput?: InputMaybe<QueryInput>;
};


export type QueryDayDeclarationsArgs = {
  queryInput?: InputMaybe<QueryInput>;
};


export type QueryDayDispatchsArgs = {
  queryInput?: InputMaybe<QueryInput>;
};


export type QueryDayPowerPurchaseArgs = {
  id: Scalars['String'];
};


export type QueryDayReportArgs = {
  queryInput?: InputMaybe<QueryInput>;
};


export type QueryDeclarationArgs = {
  id: Scalars['String'];
};


export type QueryDeclarationsArgs = {
  queryInput?: InputMaybe<QueryInput>;
};


export type QueryDispatchArgs = {
  id: Scalars['String'];
};


export type QueryDispatchsArgs = {
  queryInput?: InputMaybe<QueryInput>;
};


export type QueryDistrictArgs = {
  id: Scalars['String'];
};


export type QueryDistrictsArgs = {
  queryInput?: InputMaybe<QueryInput>;
};


export type QueryDocumentArgs = {
  id: Scalars['Int'];
};


export type QueryDocumentsArgs = {
  docType: Scalars['String'];
  queryInput?: InputMaybe<QueryInput>;
};


export type QueryEditDayPowerPurchaseArgs = {
  id: Scalars['Int'];
};


export type QueryEditMonthPowerPurchaseArgs = {
  id: Scalars['Int'];
};


export type QueryEditWeekPowerPurchaseArgs = {
  id: Scalars['Int'];
};


export type QueryGetReportYesterDayArgs = {
  customerId: Scalars['String'];
};


export type QueryMonthDeclarationsArgs = {
  queryInput?: InputMaybe<QueryInput>;
};


export type QueryMonthDispatchsArgs = {
  queryInput?: InputMaybe<QueryInput>;
};


export type QueryMonthPowerPurchaseArgs = {
  id: Scalars['String'];
};


export type QueryMonthSummaryEnergyArgs = {
  queryInput?: InputMaybe<QueryInput>;
};


export type QueryProvinceArgs = {
  id: Scalars['String'];
};


export type QueryProvincesArgs = {
  queryInput?: InputMaybe<QueryInput>;
};


export type QueryReportArgs = {
  id: Scalars['Int'];
};


export type QueryReportsArgs = {
  queryInput?: InputMaybe<QueryInput>;
};


export type QueryRoleArgs = {
  id: Scalars['String'];
};


export type QueryRolesArgs = {
  queryInput?: InputMaybe<QueryInput>;
};


export type QueryStatusArgs = {
  id: Scalars['String'];
};


export type QueryStatussArgs = {
  queryInput?: InputMaybe<QueryInput>;
};


export type QuerySummaryEnergyArgs = {
  queryInput?: InputMaybe<QueryInput>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryUsersArgs = {
  queryInput?: InputMaybe<QueryInput>;
};


export type QueryVillageArgs = {
  id: Scalars['String'];
};


export type QueryVillagesArgs = {
  queryInput?: InputMaybe<QueryInput>;
};


export type QueryWeekDeclarationsArgs = {
  queryInput?: InputMaybe<QueryInput>;
};


export type QueryWeekDispatchsArgs = {
  queryInput?: InputMaybe<QueryInput>;
};


export type QueryWeekPowerPurchaseArgs = {
  id: Scalars['String'];
};


export type QueryWeekSummaryEnergyArgs = {
  queryInput?: InputMaybe<QueryInput>;
};

export type QueryInput = {
  condition?: InputMaybe<Array<InputMaybe<Condition>>>;
  dateFillter?: InputMaybe<DateFillter>;
  join?: InputMaybe<Scalars['Boolean']>;
  pageginate?: InputMaybe<Pageginate>;
  populate?: InputMaybe<Array<Scalars['String']>>;
  search?: InputMaybe<Search>;
  sort?: Scalars['Int'];
};

export type ResYesterday = {
  __typename?: 'ResYesterday';
  asYesterday: Scalars['Int'];
  customer: Customer;
};

export type ReservoirSituationData = {
  __typename?: 'ReservoirSituationData';
  activeStorage: Storage;
  downstreamLevel: Scalars['Float'];
  totalStorage: Storage;
  upstreamLevel: Scalars['Float'];
};

export type ReservoirSituationInput = {
  activeStorage: StorageInput;
  downstreamLevel: Scalars['Float'];
  totalStorage: StorageInput;
  upstreamLevel: Scalars['Float'];
};

export type Role = {
  __typename?: 'Role';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  name: Scalars['String'];
  paths: Array<Scalars['String']>;
  permissions: Array<Maybe<Scalars['String']>>;
  roleId?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['DateTime'];
};

export type Search = {
  q?: InputMaybe<Scalars['String']>;
  searchField?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type SpillWay = {
  __typename?: 'SpillWay';
  amount: Scalars['Float'];
  volume: Scalars['Float'];
};

export type SpillWayInput = {
  amount: Scalars['Float'];
  volume: Scalars['Float'];
};

export type Status = {
  __typename?: 'Status';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  enName: Scalars['String'];
  laName: Scalars['String'];
  statusId?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['DateTime'];
};

export type Storage = {
  __typename?: 'Storage';
  amount: Scalars['Float'];
  average: Scalars['Float'];
};

export type StorageInput = {
  amount: Scalars['Float'];
  average: Scalars['Float'];
};

export type Subscription = {
  __typename?: 'Subscription';
  pong: Subscriptions;
};

export type Subscriptions = {
  __typename?: 'Subscriptions';
  pong?: Maybe<Scalars['String']>;
};

export type SummaryEnergy = {
  __typename?: 'SummaryEnergy';
  declaration: Scalars['Int'];
  dispatch: Scalars['Int'];
};

export type UnitData = {
  __typename?: 'UnitData';
  powers: Array<Scalars['String']>;
  time: Scalars['String'];
  unitName: Scalars['String'];
};

export type UnitDataInput = {
  powers: Array<Scalars['String']>;
  time: Scalars['String'];
  unitName: Scalars['String'];
};

export type UpdateAddressInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateCountryInput = {
  countryCode?: InputMaybe<Scalars['String']>;
  enName?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  laName?: InputMaybe<Scalars['String']>;
  phoneCode?: InputMaybe<Scalars['String']>;
};

export type UpdateCustomerInput = {
  abbreviation?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<Scalars['String']>;
  deadLevel?: InputMaybe<Scalars['Float']>;
  email?: InputMaybe<Scalars['String']>;
  floodLevel?: InputMaybe<Scalars['Float']>;
  fullLevel?: InputMaybe<Scalars['Float']>;
  id: Scalars['String'];
  minimumLevel?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  totalActiveStorage?: InputMaybe<Scalars['Float']>;
  unit?: InputMaybe<Scalars['Int']>;
  villageId?: InputMaybe<Scalars['String']>;
};

export type UpdateData = {
  __typename?: 'UpdateData';
  customerId: Customer;
  updateId: Scalars['String'];
  userId?: Maybe<User>;
};

export type UpdateDayPowerPurchaseInput = {
  customerId?: InputMaybe<Scalars['String']>;
  edit?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['String'];
  machinesAvailability?: InputMaybe<MachinesAvailabilityInput>;
  powerDetail?: InputMaybe<Array<PowerDetailInput>>;
  powers?: InputMaybe<Array<Scalars['String']>>;
  remark?: InputMaybe<Scalars['String']>;
  remarks?: InputMaybe<Array<Scalars['String']>>;
  reservoirSituation?: InputMaybe<ReservoirSituationInput>;
  waterDischarge?: InputMaybe<WaterDischargeInput>;
};

export type UpdateDeclarationInput = {
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  powers?: InputMaybe<Array<Scalars['String']>>;
  remarks?: InputMaybe<Array<Scalars['String']>>;
  units?: InputMaybe<Array<UnitDataInput>>;
};

export type UpdateDispatchInput = {
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  powers?: InputMaybe<Array<Scalars['String']>>;
  remarks?: InputMaybe<Array<Scalars['String']>>;
  units?: InputMaybe<Array<UnitDataInput>>;
};

export type UpdateDistrictInput = {
  districtCode?: InputMaybe<Scalars['String']>;
  enName?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  laName?: InputMaybe<Scalars['String']>;
  provinceId?: InputMaybe<Scalars['String']>;
};

export type UpdateDocumentInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateEditDayPowerPurchaseInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateEditMonthPowerPurchaseInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateEditWeekPowerPurchaseInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateMonthPowerPurchaseInput = {
  customerId?: InputMaybe<Scalars['String']>;
  edit?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['String'];
  powerDetail?: InputMaybe<Array<PowerDetailInput>>;
  powers?: InputMaybe<Array<Scalars['String']>>;
  remark?: InputMaybe<Scalars['String']>;
  remarks?: InputMaybe<Array<Scalars['String']>>;
};

export type UpdateProvinceInput = {
  abbLetters?: InputMaybe<Scalars['String']>;
  countryId?: InputMaybe<Scalars['String']>;
  enName?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  laName?: InputMaybe<Scalars['String']>;
  provinceCode?: InputMaybe<Scalars['String']>;
};

export type UpdateReportInput = {
  activeStorage?: InputMaybe<ActiveStorageInput>;
  customerId?: InputMaybe<Scalars['String']>;
  dwf?: InputMaybe<Scalars['Float']>;
  dwy?: InputMaybe<Scalars['Float']>;
  id: Scalars['Int'];
  inflow?: InputMaybe<InflowInput>;
  netEnergyOutput?: InputMaybe<Scalars['Float']>;
  otherWaterReleased?: InputMaybe<OtherWaterReleasedInput>;
  outFlow?: InputMaybe<OutFlowInput>;
  powerDetail?: InputMaybe<Array<PowerDetailInput>>;
  powers?: InputMaybe<Array<Scalars['String']>>;
  pws?: InputMaybe<Scalars['Float']>;
  rainFall?: InputMaybe<Scalars['Float']>;
  remark?: InputMaybe<Scalars['String']>;
  remarks?: InputMaybe<Array<Scalars['String']>>;
  spillWay?: InputMaybe<SpillWayInput>;
  waterLevel?: InputMaybe<Scalars['Float']>;
  waterRate?: InputMaybe<Scalars['Float']>;
};

export type UpdateRoleInput = {
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  paths?: InputMaybe<Array<Scalars['String']>>;
  permissions?: InputMaybe<Array<Scalars['String']>>;
};

export type UpdateStatusInput = {
  enName?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  laName?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  customerId: Scalars['String'];
  customers: Array<Scalars['String']>;
  email: Scalars['String'];
  fName: Scalars['String'];
  id: Scalars['String'];
  lName: Scalars['String'];
  phone: Scalars['String'];
  roleId: Scalars['String'];
};

export type UpdateVillageInput = {
  districtId?: InputMaybe<Scalars['String']>;
  enName?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  laName?: InputMaybe<Scalars['String']>;
  villageCode?: InputMaybe<Scalars['String']>;
};

export type UpdateWeekPowerPurchaseInput = {
  customerId?: InputMaybe<Scalars['String']>;
  edit?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['String'];
  powerDetail?: InputMaybe<Array<PowerDetailInput>>;
  powers?: InputMaybe<Array<Scalars['String']>>;
  remark?: InputMaybe<Scalars['String']>;
  remarks?: InputMaybe<Array<Scalars['String']>>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  customerId?: Maybe<Customer>;
  customers: Array<Maybe<Customer>>;
  email: Scalars['String'];
  fName: Scalars['String'];
  lName: Scalars['String'];
  phone: Scalars['String'];
  roleId?: Maybe<Role>;
  updatedAt: Scalars['DateTime'];
  userId?: Maybe<Scalars['Int']>;
};

export type Village = {
  __typename?: 'Village';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  districtId: District;
  enName: Scalars['String'];
  laName: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  villageCode?: Maybe<Scalars['String']>;
};

export type WaterDischargeData = {
  __typename?: 'WaterDischargeData';
  ecologicalDischarge: DescriptionWaterDischargeData;
  spillwayDischarge: DescriptionWaterDischargeData;
  turbineDischarge: DescriptionWaterDischargeData;
};

export type WaterDischargeInput = {
  ecologicalDischarge: DescriptionWaterDischargeInput;
  spillwayDischarge: DescriptionWaterDischargeInput;
  turbineDischarge: DescriptionWaterDischargeInput;
};

export type WeekPowerPurchase = {
  __typename?: 'WeekPowerPurchase';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  decAcknowleged: Scalars['Boolean'];
  decAcknowlegedDetail?: Maybe<Array<Maybe<AcknowlegeData>>>;
  decCustomerId: Customer;
  decUserId: User;
  disAcknowleged: Scalars['Boolean'];
  disAcknowlegedDetail?: Maybe<Array<Maybe<AcknowlegeData>>>;
  disCustomerId: Customer;
  disUserId?: Maybe<User>;
  edited: Scalars['Boolean'];
  edits?: Maybe<Array<Maybe<EditData>>>;
  originalDetail: OriginalDetail;
  powerDetail: Array<PowerDetailData>;
  powerNo: Scalars['String'];
  powers: Array<Scalars['String']>;
  price: Scalars['Float'];
  remark?: Maybe<Scalars['String']>;
  remarks: Array<Scalars['String']>;
  totalPower: Scalars['Float'];
  totalUnit: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  weekId: Scalars['Int'];
};

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Login', accessToken: string, data: { __typename?: 'User', _id: string, fName: string, lName: string, email: string, phone: string, roleId?: { __typename?: 'Role', _id: string, name: string, paths: Array<string>, permissions: Array<string | null> } | null, customerId?: { __typename?: 'Customer', email: string, logo?: string | null, name: string, phone: string, unit: number, type: number, _id: string, minimumLevel: number, totalActiveStorage: number, floodLevel: number, fullLevel: number, deadLevel: number, abbreviation: string } | null } } };

export type CreateReportMutationVariables = Exact<{
  createReportInput: CreateReportInput;
}>;


export type CreateReportMutation = { __typename?: 'Mutation', createReport: { __typename?: 'DailyReport', _id: string, decCustomerId: { __typename?: 'Customer', _id: string, abbreviation: string, address: string, company: string, name: string, phone: string }, disCustomerId: { __typename?: 'Customer', _id: string, abbreviation: string, address: string, company: string, name: string, phone: string } } };

export type CreateDayDeclarationMutationVariables = Exact<{
  createDayDeclarationInput: CreateDayPowerPurchaseInput;
}>;


export type CreateDayDeclarationMutation = { __typename?: 'Mutation', createDayDeclaration: { __typename?: 'DayPowerPurchase', _id: string, createdAt: any, updatedAt: any, dayId: number, powerNo: string, totalPower: number, totalUnit: number, decCustomerId: { __typename?: 'Customer', _id: string, abbreviation: string, address: string, company: string, name: string, phone: string }, disCustomerId: { __typename?: 'Customer', _id: string, abbreviation: string, address: string, company: string, name: string, phone: string } } };

export type CreateWeekPowerPurchaseMutationVariables = Exact<{
  createWeekPowerPurchaseInput: CreateWeekPowerPurchaseInput;
}>;


export type CreateWeekPowerPurchaseMutation = { __typename?: 'Mutation', createWeekPowerPurchase: { __typename?: 'WeekPowerPurchase', _id: string, createdAt: any, updatedAt: any, weekId: number, powerNo: string, totalPower: number, totalUnit: number, decCustomerId: { __typename?: 'Customer', _id: string, abbreviation: string, address: string, company: string, name: string, phone: string }, disCustomerId: { __typename?: 'Customer', _id: string, abbreviation: string, address: string, company: string, name: string, phone: string } } };

export type AcknowledgedDayDispatchMutationVariables = Exact<{
  acknowledgedDayDispatchInput: UpdateDayPowerPurchaseInput;
}>;


export type AcknowledgedDayDispatchMutation = { __typename?: 'Mutation', acknowledgedDayDispatch: { __typename?: 'DayPowerPurchase', _id: string, createdAt: any, updatedAt: any, dayId: number, powerNo: string, totalPower: number, totalUnit: number } };

export type AcknowledgedDayDeclarationMutationVariables = Exact<{
  acknowledgedDayDeclarationInput: UpdateDayPowerPurchaseInput;
}>;


export type AcknowledgedDayDeclarationMutation = { __typename?: 'Mutation', acknowledgedDayDeclaration: { __typename?: 'DayPowerPurchase', _id: string, createdAt: any, updatedAt: any, dayId: number, powerNo: string, totalPower: number, totalUnit: number } };

export type CreateCustomerMutationVariables = Exact<{
  createCustomerInput: CreateCustomerInput;
}>;


export type CreateCustomerMutation = { __typename?: 'Mutation', createCustomer: { __typename?: 'Customer', _id: string, type: number, name: string, company: string, abbreviation: string, email: string, logo?: string | null, unit: number, address: string, phone: string } };

export type UpdateCustomerMutationVariables = Exact<{
  updateCustomerInput: UpdateCustomerInput;
}>;


export type UpdateCustomerMutation = { __typename?: 'Mutation', updateCustomer: { __typename?: 'Customer', _id: string, type: number, name: string, company: string } };

export type RemoveCustomerMutationVariables = Exact<{
  removeCustomerId: Scalars['String'];
}>;


export type RemoveCustomerMutation = { __typename?: 'Mutation', removeCustomer: { __typename?: 'Customer', _id: string, type: number, name: string, company: string } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', _id: string, fName: string, lName: string, email: string, phone: string } };

export type UpdateUserMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', _id: string, fName: string, lName: string, email: string, phone: string } };

export type RemoveUserMutationVariables = Exact<{
  removeUserId: Scalars['String'];
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: { __typename?: 'User', _id: string, fName: string, lName: string, email: string, phone: string } };

export type AcknowledgedWeekDeclarationMutationVariables = Exact<{
  acknowledgedWeekDeclaration: UpdateWeekPowerPurchaseInput;
}>;


export type AcknowledgedWeekDeclarationMutation = { __typename?: 'Mutation', acknowledgedWeekDeclaration: { __typename?: 'WeekPowerPurchase', _id: string, createdAt: any, updatedAt: any, totalPower: number, totalUnit: number } };

export type AcknowledgedWeekDispatchMutationVariables = Exact<{
  acknowledgedWeekDispatch: UpdateWeekPowerPurchaseInput;
}>;


export type AcknowledgedWeekDispatchMutation = { __typename?: 'Mutation', acknowledgedWeekDispatch: { __typename?: 'WeekPowerPurchase', _id: string, createdAt: any, updatedAt: any, totalPower: number, totalUnit: number } };

export type CreateMonthPowerPurchaseMutationVariables = Exact<{
  createMonthPowerPurchaseInput: CreateMonthPowerPurchaseInput;
}>;


export type CreateMonthPowerPurchaseMutation = { __typename?: 'Mutation', createMonthPowerPurchase: { __typename?: 'MonthPowerPurchase', _id: string, createdAt: any, updatedAt: any, monthId: number, powerNo: string, totalPower: number, totalUnit: number, decCustomerId: { __typename?: 'Customer', _id: string, abbreviation: string, address: string, company: string, name: string, phone: string }, disCustomerId: { __typename?: 'Customer', _id: string, abbreviation: string, address: string, company: string, name: string, phone: string } } };

export type AcknowledgedMonthDeclarationMutationVariables = Exact<{
  acknowledgedMonthDeclaration: UpdateMonthPowerPurchaseInput;
}>;


export type AcknowledgedMonthDeclarationMutation = { __typename?: 'Mutation', acknowledgedMonthDeclaration: { __typename?: 'MonthPowerPurchase', _id: string, createdAt: any, updatedAt: any, totalPower: number, totalUnit: number } };

export type AcknowledgedMonthDispatchMutationVariables = Exact<{
  acknowledgedMonthDispatch: UpdateMonthPowerPurchaseInput;
}>;


export type AcknowledgedMonthDispatchMutation = { __typename?: 'Mutation', acknowledgedMonthDispatch: { __typename?: 'MonthPowerPurchase', _id: string, createdAt: any, updatedAt: any, totalPower: number, totalUnit: number } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Login', accessToken: string, data: { __typename?: 'User', _id: string, userId?: number | null, fName: string, lName: string, email: string, phone: string, roleId?: { __typename?: 'Role', _id: string, name: string, paths: Array<string>, permissions: Array<string | null> } | null, customerId?: { __typename?: 'Customer', email: string, logo?: string | null, name: string, phone: string, unit: number, type: number, _id: string, minimumLevel: number, totalActiveStorage: number, floodLevel: number, fullLevel: number, deadLevel: number, abbreviation: string } | null } } | null };

export type DocumentsQueryVariables = Exact<{
  docType: Scalars['String'];
  queryInput?: InputMaybe<QueryInput>;
}>;


export type DocumentsQuery = { __typename?: 'Query', documents: Array<{ __typename?: 'Document', _id: string, createdAt: any, powerNo: string, declaration: string, dispatch: string, dis_dec: string, edited: boolean, decAcknowleged: boolean, disAcknowleged: boolean } | null> };

export type ReportsQueryVariables = Exact<{
  queryInput?: InputMaybe<QueryInput>;
}>;


export type ReportsQuery = { __typename?: 'Query', reports: Array<{ __typename?: 'DailyReport', _id: string, createdAt: any, updatedAt: any, reportId: number, powerNo: string, totalPower: number, totalUnit: number, remark?: string | null, powers: Array<string>, remarks: Array<string>, edited: boolean, waterLevel: number, dwy: number, dwf: number, pws: number, rainFall: number, netEnergyOutput: number, waterRate: number, decCustomerId: { __typename?: 'Customer', _id: string, company: string, name: string, phone: string, abbreviation: string }, disCustomerId: { __typename?: 'Customer', abbreviation: string, company: string, name: string, phone: string, _id: string }, inflow: { __typename?: 'Inflow', amount: number, volume: number }, outFlow: { __typename?: 'OutFlow', amount: number, volume: number }, otherWaterReleased: { __typename?: 'OtherWaterReleased', amount: number, volume: number }, spillWay: { __typename?: 'SpillWay', amount: number, volume: number }, activeStorage: { __typename?: 'ActiveStorage', amount: number, average: number } } | null> };

export type CustomersQueryVariables = Exact<{
  queryInput?: InputMaybe<QueryInput>;
}>;


export type CustomersQuery = { __typename?: 'Query', customers: Array<{ __typename?: 'Customer', _id: string, createdAt: any, updatedAt: any, type: number, name: string, company: string, abbreviation: string, email: string, logo?: string | null, unit: number, address: string, phone: string, floodLevel: number, fullLevel: number, minimumLevel: number, deadLevel: number, totalActiveStorage: number } | null> };

export type GetPowerSourcesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPowerSourcesQuery = { __typename?: 'Query', getPowerSources: Array<{ __typename?: 'Customer', _id: string, type: number, name: string, company: string, abbreviation: string, email: string, logo?: string | null, unit: number, address: string, phone: string, floodLevel: number, fullLevel: number, minimumLevel: number, deadLevel: number, totalActiveStorage: number } | null> };

export type CustomerSelectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type CustomerSelectionsQuery = { __typename?: 'Query', customerSelections: Array<{ __typename?: 'Customer', _id: string, name: string, company: string, abbreviation: string } | null> };

export type ChartQueryVariables = Exact<{
  queryInput?: InputMaybe<QueryInput>;
}>;


export type ChartQuery = { __typename?: 'Query', chart: { __typename?: 'Chart', labels: Array<number>, declarations: Array<number | null>, dispatchs: Array<number | null>, min: number, max: number } };

export type SummaryEnergyQueryVariables = Exact<{
  queryInput?: InputMaybe<QueryInput>;
}>;


export type SummaryEnergyQuery = { __typename?: 'Query', summaryEnergy?: { __typename?: 'SummaryEnergy', declaration: number, dispatch: number } | null };

export type MonthSummaryEnergyQueryVariables = Exact<{
  queryInput?: InputMaybe<QueryInput>;
}>;


export type MonthSummaryEnergyQuery = { __typename?: 'Query', monthSummaryEnergy?: { __typename?: 'SummaryEnergy', declaration: number, dispatch: number } | null };

export type WeekSummaryEnergyQueryVariables = Exact<{
  queryInput?: InputMaybe<QueryInput>;
}>;


export type WeekSummaryEnergyQuery = { __typename?: 'Query', weekSummaryEnergy?: { __typename?: 'SummaryEnergy', declaration: number, dispatch: number } | null };

export type DayDeclarationsQueryVariables = Exact<{
  queryInput?: InputMaybe<QueryInput>;
}>;


export type DayDeclarationsQuery = { __typename?: 'Query', dayDeclarations: Array<{ __typename?: 'DayPowerPurchase', _id: string, createdAt: any, updatedAt: any, dayId: number, powerNo: string, totalPower: number, totalUnit: number, remark?: string | null, edited: boolean, decAcknowleged: boolean, disAcknowleged: boolean, decUserId: { __typename?: 'User', _id: string, email: string, fName: string, lName: string, phone: string }, decCustomerId: { __typename?: 'Customer', _id: string, abbreviation: string, address: string, company: string, name: string, phone: string, logo?: string | null, type: number, unit: number, email: string }, disUserId?: { __typename?: 'User', _id: string, email: string, fName: string, lName: string, phone: string } | null, disCustomerId: { __typename?: 'Customer', _id: string, abbreviation: string, address: string, company: string, name: string, phone: string, logo?: string | null, type: number, unit: number }, originalDetail: { __typename?: 'OriginalDetail', totalPower: number, totalUnit: number } } | null> };

export type DayDispatchsQueryVariables = Exact<{
  queryInput?: InputMaybe<QueryInput>;
}>;


export type DayDispatchsQuery = { __typename?: 'Query', dayDispatchs: Array<{ __typename?: 'DayPowerPurchase', _id: string, createdAt: any, updatedAt: any, dayId: number, powerNo: string, totalPower: number, totalUnit: number, remark?: string | null, edited: boolean, decAcknowleged: boolean, disAcknowleged: boolean, decUserId: { __typename?: 'User', _id: string, email: string, fName: string, lName: string, phone: string }, decCustomerId: { __typename?: 'Customer', _id: string, abbreviation: string, address: string, company: string, name: string, phone: string, logo?: string | null, type: number, unit: number, email: string }, disUserId?: { __typename?: 'User', _id: string, email: string, fName: string, lName: string, phone: string } | null, disCustomerId: { __typename?: 'Customer', _id: string, abbreviation: string, address: string, company: string, name: string, phone: string, logo?: string | null, type: number, unit: number }, originalDetail: { __typename?: 'OriginalDetail', totalPower: number, totalUnit: number } } | null> };

export type MonthDeclarationsQueryVariables = Exact<{
  queryInput?: InputMaybe<QueryInput>;
}>;


export type MonthDeclarationsQuery = { __typename?: 'Query', monthDeclarations: Array<{ __typename?: 'MonthPowerPurchase', _id: string, createdAt: any, updatedAt: any, monthId: number, powerNo: string, totalPower: number, totalUnit: number, remark?: string | null, edited: boolean, decAcknowleged: boolean, disAcknowleged: boolean, decUserId: { __typename?: 'User', _id: string, email: string, fName: string, lName: string, phone: string }, decCustomerId: { __typename?: 'Customer', _id: string, abbreviation: string, address: string, company: string, name: string, phone: string, logo?: string | null, type: number, unit: number, email: string }, disUserId?: { __typename?: 'User', _id: string, email: string, fName: string, lName: string, phone: string } | null, disCustomerId: { __typename?: 'Customer', _id: string, abbreviation: string, address: string, company: string, name: string, phone: string, logo?: string | null, type: number, unit: number }, originalDetail: { __typename?: 'OriginalDetail', totalPower: number, totalUnit: number } } | null> };

export type MonthDispatchsQueryVariables = Exact<{
  queryInput?: InputMaybe<QueryInput>;
}>;


export type MonthDispatchsQuery = { __typename?: 'Query', monthDispatchs: Array<{ __typename?: 'MonthPowerPurchase', _id: string, createdAt: any, updatedAt: any, monthId: number, powerNo: string, totalPower: number, totalUnit: number, remark?: string | null, edited: boolean, decAcknowleged: boolean, disAcknowleged: boolean, decUserId: { __typename?: 'User', _id: string, email: string, fName: string, lName: string, phone: string }, decCustomerId: { __typename?: 'Customer', _id: string, abbreviation: string, address: string, company: string, name: string, phone: string, logo?: string | null, type: number, unit: number, email: string }, disUserId?: { __typename?: 'User', _id: string, email: string, fName: string, lName: string, phone: string } | null, disCustomerId: { __typename?: 'Customer', _id: string, abbreviation: string, address: string, company: string, name: string, phone: string, logo?: string | null, type: number, unit: number }, originalDetail: { __typename?: 'OriginalDetail', totalPower: number, totalUnit: number } } | null> };

export type MonthPowerPurchaseQueryVariables = Exact<{
  monthPowerPurchaseId: Scalars['String'];
}>;


export type MonthPowerPurchaseQuery = { __typename?: 'Query', monthPowerPurchase: { __typename?: 'MonthPowerPurchase', _id: string, createdAt: any, updatedAt: any, monthId: number, powerNo: string, totalPower: number, totalUnit: number, remark?: string | null, powers: Array<string>, remarks: Array<string>, edited: boolean, decAcknowleged: boolean, disAcknowleged: boolean } };

export type DayPowerPurchaseQueryVariables = Exact<{
  dayPowerPurchaseId: Scalars['String'];
}>;


export type DayPowerPurchaseQuery = { __typename?: 'Query', dayPowerPurchase?: { __typename?: 'DayPowerPurchase', _id: string, createdAt: any, updatedAt: any, dayId: number, powerNo: string, totalPower: number, totalUnit: number, remark?: string | null, edited: boolean, decAcknowleged: boolean, disAcknowleged: boolean, price: number, powers: Array<string>, remarks: Array<string>, decUserId: { __typename?: 'User', _id: string, email: string, fName: string, lName: string, phone: string }, decCustomerId: { __typename?: 'Customer', _id: string, abbreviation: string, address: string, company: string, name: string, phone: string, logo?: string | null, type: number, unit: number, email: string }, disUserId?: { __typename?: 'User', _id: string, email: string, fName: string, lName: string, phone: string } | null, disCustomerId: { __typename?: 'Customer', _id: string, abbreviation: string, address: string, company: string, name: string, phone: string, logo?: string | null, type: number, unit: number, email: string }, reservoirSituation: { __typename?: 'ReservoirSituationData', upstreamLevel: number, downstreamLevel: number, totalStorage: { __typename?: 'Storage', amount: number, average: number }, activeStorage: { __typename?: 'Storage', amount: number, average: number } }, machinesAvailability: { __typename?: 'MachinesAvailabilityData', maxs: Array<number>, mins: Array<number> }, waterDischarge: { __typename?: 'WaterDischargeData', turbineDischarge: { __typename?: 'DescriptionWaterDischargeData', amount: number, average: number }, spillwayDischarge: { __typename?: 'DescriptionWaterDischargeData', amount: number, average: number }, ecologicalDischarge: { __typename?: 'DescriptionWaterDischargeData', amount: number, average: number } }, originalDetail: { __typename?: 'OriginalDetail', totalPower: number, totalUnit: number, remarks: Array<string | null>, powers: Array<string>, details: Array<{ __typename?: 'PowerDetailData', powers: Array<string>, title: string }> } } | null };

export type RolesQueryVariables = Exact<{
  queryInput?: InputMaybe<QueryInput>;
}>;


export type RolesQuery = { __typename?: 'Query', roles: Array<{ __typename?: 'Role', _id: string, roleId?: number | null, name: string, createdAt: any, updatedAt: any } | null> };

export type UsersQueryVariables = Exact<{
  queryInput?: InputMaybe<QueryInput>;
}>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', _id: string, createdAt: any, updatedAt: any, userId?: number | null, fName: string, lName: string, email: string, phone: string, customerId?: { __typename?: 'Customer', _id: string, name: string, phone: string, type: number, company: string } | null, roleId?: { __typename?: 'Role', _id: string, name: string } | null, customers: Array<{ __typename?: 'Customer', _id: string, name: string, phone: string, type: number, company: string } | null> } | null> };

export type WeekDeclarationsQueryVariables = Exact<{
  queryInput?: InputMaybe<QueryInput>;
}>;


export type WeekDeclarationsQuery = { __typename?: 'Query', weekDeclarations: Array<{ __typename?: 'WeekPowerPurchase', _id: string, createdAt: any, updatedAt: any, weekId: number, powerNo: string, totalPower: number, totalUnit: number, remark?: string | null, edited: boolean, decAcknowleged: boolean, disAcknowleged: boolean, decUserId: { __typename?: 'User', _id: string, email: string, fName: string, lName: string, phone: string }, decCustomerId: { __typename?: 'Customer', _id: string, abbreviation: string, address: string, company: string, name: string, phone: string, logo?: string | null, type: number, unit: number, email: string }, disUserId?: { __typename?: 'User', _id: string, email: string, fName: string, lName: string, phone: string } | null, disCustomerId: { __typename?: 'Customer', _id: string, abbreviation: string, address: string, company: string, name: string, phone: string, logo?: string | null, type: number, unit: number }, originalDetail: { __typename?: 'OriginalDetail', totalPower: number, totalUnit: number } } | null> };

export type WeekDispatchsQueryVariables = Exact<{
  queryInput?: InputMaybe<QueryInput>;
}>;


export type WeekDispatchsQuery = { __typename?: 'Query', weekDispatchs: Array<{ __typename?: 'WeekPowerPurchase', _id: string, createdAt: any, updatedAt: any, weekId: number, powerNo: string, totalPower: number, totalUnit: number, remark?: string | null, edited: boolean, decAcknowleged: boolean, disAcknowleged: boolean, decUserId: { __typename?: 'User', _id: string, email: string, fName: string, lName: string, phone: string }, decCustomerId: { __typename?: 'Customer', _id: string, abbreviation: string, address: string, company: string, name: string, phone: string, logo?: string | null, type: number, unit: number, email: string }, disUserId?: { __typename?: 'User', _id: string, email: string, fName: string, lName: string, phone: string } | null, disCustomerId: { __typename?: 'Customer', _id: string, abbreviation: string, address: string, company: string, name: string, phone: string, logo?: string | null, type: number, unit: number }, originalDetail: { __typename?: 'OriginalDetail', totalPower: number, totalUnit: number } } | null> };

export type AllWeeklyDocumentQueryVariables = Exact<{
  queryInput?: InputMaybe<QueryInput>;
}>;


export type AllWeeklyDocumentQuery = { __typename?: 'Query', allWeeklyDocument: Array<{ __typename?: 'WeekPowerPurchase', _id: string, createdAt: any, updatedAt: any, weekId: number, powerNo: string, totalPower: number, totalUnit: number, remark?: string | null, edited: boolean, decAcknowleged: boolean, disAcknowleged: boolean, decUserId: { __typename?: 'User', _id: string, email: string, fName: string, lName: string, phone: string }, decCustomerId: { __typename?: 'Customer', _id: string, abbreviation: string, address: string, company: string, name: string, phone: string, logo?: string | null, type: number, unit: number, email: string }, disUserId?: { __typename?: 'User', _id: string, email: string, fName: string, lName: string, phone: string } | null, disCustomerId: { __typename?: 'Customer', _id: string, abbreviation: string, address: string, company: string, name: string, phone: string, logo?: string | null, type: number, unit: number } } | null> };

export type WeekPowerPurchaseQueryVariables = Exact<{
  weekPowerPurchaseId: Scalars['String'];
}>;


export type WeekPowerPurchaseQuery = { __typename?: 'Query', weekPowerPurchase: { __typename?: 'WeekPowerPurchase', _id: string, createdAt: any, updatedAt: any, weekId: number, powerNo: string, totalPower: number, totalUnit: number, remark?: string | null, powers: Array<string>, remarks: Array<string>, edited: boolean, decAcknowleged: boolean, disAcknowleged: boolean } };

export type DayReportQueryVariables = Exact<{
  queryInput?: InputMaybe<QueryInput>;
}>;


export type DayReportQuery = { __typename?: 'Query', dayReport: Array<{ __typename?: 'DayReport', _id: string, createdAt: any, dayId: number, powerNo: string, totalPower: number, totalUnit: number, remark?: string | null, powers: Array<number>, remarks: Array<string> } | null> };

export type GetReportYesterDayQueryVariables = Exact<{
  customerId: Scalars['String'];
}>;


export type GetReportYesterDayQuery = { __typename?: 'Query', getReportYesterDay?: { __typename?: 'ResYesterday', asYesterday: number, customer: { __typename?: 'Customer', _id: string, fullLevel: number, minimumLevel: number, totalActiveStorage: number, unit: number } } | null };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"fName"}},{"kind":"Field","name":{"kind":"Name","value":"lName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"roleId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"paths"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"}}]}},{"kind":"Field","name":{"kind":"Name","value":"customerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"minimumLevel"}},{"kind":"Field","name":{"kind":"Name","value":"totalActiveStorage"}},{"kind":"Field","name":{"kind":"Name","value":"floodLevel"}},{"kind":"Field","name":{"kind":"Name","value":"fullLevel"}},{"kind":"Field","name":{"kind":"Name","value":"deadLevel"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const CreateReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createReportInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateReportInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createReportInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createReportInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"decCustomerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"disCustomerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]}}]} as unknown as DocumentNode<CreateReportMutation, CreateReportMutationVariables>;
export const CreateDayDeclarationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDayDeclaration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createDayDeclarationInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateDayPowerPurchaseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDayDeclaration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createDayDeclarationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createDayDeclarationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"dayId"}},{"kind":"Field","name":{"kind":"Name","value":"powerNo"}},{"kind":"Field","name":{"kind":"Name","value":"totalPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnit"}},{"kind":"Field","name":{"kind":"Name","value":"decCustomerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"disCustomerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]}}]} as unknown as DocumentNode<CreateDayDeclarationMutation, CreateDayDeclarationMutationVariables>;
export const CreateWeekPowerPurchaseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateWeekPowerPurchase"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createWeekPowerPurchaseInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateWeekPowerPurchaseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWeekPowerPurchase"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createWeekPowerPurchaseInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createWeekPowerPurchaseInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"weekId"}},{"kind":"Field","name":{"kind":"Name","value":"powerNo"}},{"kind":"Field","name":{"kind":"Name","value":"totalPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnit"}},{"kind":"Field","name":{"kind":"Name","value":"decCustomerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"disCustomerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]}}]} as unknown as DocumentNode<CreateWeekPowerPurchaseMutation, CreateWeekPowerPurchaseMutationVariables>;
export const AcknowledgedDayDispatchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AcknowledgedDayDispatch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"acknowledgedDayDispatchInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDayPowerPurchaseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acknowledgedDayDispatch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"acknowledgedDayDispatchInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"acknowledgedDayDispatchInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"dayId"}},{"kind":"Field","name":{"kind":"Name","value":"powerNo"}},{"kind":"Field","name":{"kind":"Name","value":"totalPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnit"}}]}}]}}]} as unknown as DocumentNode<AcknowledgedDayDispatchMutation, AcknowledgedDayDispatchMutationVariables>;
export const AcknowledgedDayDeclarationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AcknowledgedDayDeclaration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"acknowledgedDayDeclarationInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDayPowerPurchaseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acknowledgedDayDeclaration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"acknowledgedDayDeclarationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"acknowledgedDayDeclarationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"dayId"}},{"kind":"Field","name":{"kind":"Name","value":"powerNo"}},{"kind":"Field","name":{"kind":"Name","value":"totalPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnit"}}]}}]}}]} as unknown as DocumentNode<AcknowledgedDayDeclarationMutation, AcknowledgedDayDeclarationMutationVariables>;
export const CreateCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createCustomerInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCustomerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createCustomerInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createCustomerInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]} as unknown as DocumentNode<CreateCustomerMutation, CreateCustomerMutationVariables>;
export const UpdateCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateCustomerInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCustomerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateCustomerInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateCustomerInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"company"}}]}}]}}]} as unknown as DocumentNode<UpdateCustomerMutation, UpdateCustomerMutationVariables>;
export const RemoveCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveCustomer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"removeCustomerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"removeCustomerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"company"}}]}}]}}]} as unknown as DocumentNode<RemoveCustomerMutation, RemoveCustomerMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"fName"}},{"kind":"Field","name":{"kind":"Name","value":"lName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"fName"}},{"kind":"Field","name":{"kind":"Name","value":"lName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const RemoveUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"removeUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"removeUserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"fName"}},{"kind":"Field","name":{"kind":"Name","value":"lName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]} as unknown as DocumentNode<RemoveUserMutation, RemoveUserMutationVariables>;
export const AcknowledgedWeekDeclarationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AcknowledgedWeekDeclaration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"acknowledgedWeekDeclaration"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWeekPowerPurchaseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acknowledgedWeekDeclaration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"acknowledgedWeekDeclaration"},"value":{"kind":"Variable","name":{"kind":"Name","value":"acknowledgedWeekDeclaration"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnit"}}]}}]}}]} as unknown as DocumentNode<AcknowledgedWeekDeclarationMutation, AcknowledgedWeekDeclarationMutationVariables>;
export const AcknowledgedWeekDispatchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AcknowledgedWeekDispatch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"acknowledgedWeekDispatch"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWeekPowerPurchaseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acknowledgedWeekDispatch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"acknowledgedWeekDispatch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"acknowledgedWeekDispatch"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnit"}}]}}]}}]} as unknown as DocumentNode<AcknowledgedWeekDispatchMutation, AcknowledgedWeekDispatchMutationVariables>;
export const CreateMonthPowerPurchaseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMonthPowerPurchase"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createMonthPowerPurchaseInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMonthPowerPurchaseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMonthPowerPurchase"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createMonthPowerPurchaseInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createMonthPowerPurchaseInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"monthId"}},{"kind":"Field","name":{"kind":"Name","value":"powerNo"}},{"kind":"Field","name":{"kind":"Name","value":"totalPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnit"}},{"kind":"Field","name":{"kind":"Name","value":"decCustomerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"disCustomerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]}}]} as unknown as DocumentNode<CreateMonthPowerPurchaseMutation, CreateMonthPowerPurchaseMutationVariables>;
export const AcknowledgedMonthDeclarationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AcknowledgedMonthDeclaration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"acknowledgedMonthDeclaration"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMonthPowerPurchaseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acknowledgedMonthDeclaration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"acknowledgedMonthDeclaration"},"value":{"kind":"Variable","name":{"kind":"Name","value":"acknowledgedMonthDeclaration"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnit"}}]}}]}}]} as unknown as DocumentNode<AcknowledgedMonthDeclarationMutation, AcknowledgedMonthDeclarationMutationVariables>;
export const AcknowledgedMonthDispatchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AcknowledgedMonthDispatch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"acknowledgedMonthDispatch"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMonthPowerPurchaseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acknowledgedMonthDispatch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"acknowledgedMonthDispatch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"acknowledgedMonthDispatch"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnit"}}]}}]}}]} as unknown as DocumentNode<AcknowledgedMonthDispatchMutation, AcknowledgedMonthDispatchMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"roleId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"paths"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fName"}},{"kind":"Field","name":{"kind":"Name","value":"lName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"customerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"minimumLevel"}},{"kind":"Field","name":{"kind":"Name","value":"totalActiveStorage"}},{"kind":"Field","name":{"kind":"Name","value":"floodLevel"}},{"kind":"Field","name":{"kind":"Name","value":"fullLevel"}},{"kind":"Field","name":{"kind":"Name","value":"deadLevel"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const DocumentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Documents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"docType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"documents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"docType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"docType"}}},{"kind":"Argument","name":{"kind":"Name","value":"queryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"powerNo"}},{"kind":"Field","name":{"kind":"Name","value":"declaration"}},{"kind":"Field","name":{"kind":"Name","value":"dispatch"}},{"kind":"Field","name":{"kind":"Name","value":"dis_dec"}},{"kind":"Field","name":{"kind":"Name","value":"edited"}},{"kind":"Field","name":{"kind":"Name","value":"decAcknowleged"}},{"kind":"Field","name":{"kind":"Name","value":"disAcknowleged"}}]}}]}}]} as unknown as DocumentNode<DocumentsQuery, DocumentsQueryVariables>;
export const ReportsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Reports"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reports"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"reportId"}},{"kind":"Field","name":{"kind":"Name","value":"powerNo"}},{"kind":"Field","name":{"kind":"Name","value":"totalPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnit"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"powers"}},{"kind":"Field","name":{"kind":"Name","value":"remarks"}},{"kind":"Field","name":{"kind":"Name","value":"edited"}},{"kind":"Field","name":{"kind":"Name","value":"waterLevel"}},{"kind":"Field","name":{"kind":"Name","value":"dwy"}},{"kind":"Field","name":{"kind":"Name","value":"dwf"}},{"kind":"Field","name":{"kind":"Name","value":"pws"}},{"kind":"Field","name":{"kind":"Name","value":"rainFall"}},{"kind":"Field","name":{"kind":"Name","value":"netEnergyOutput"}},{"kind":"Field","name":{"kind":"Name","value":"waterRate"}},{"kind":"Field","name":{"kind":"Name","value":"decCustomerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"disCustomerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"inflow"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}}]}},{"kind":"Field","name":{"kind":"Name","value":"outFlow"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}}]}},{"kind":"Field","name":{"kind":"Name","value":"otherWaterReleased"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}}]}},{"kind":"Field","name":{"kind":"Name","value":"spillWay"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}}]}},{"kind":"Field","name":{"kind":"Name","value":"activeStorage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"average"}}]}}]}}]}}]} as unknown as DocumentNode<ReportsQuery, ReportsQueryVariables>;
export const CustomersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Customers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"floodLevel"}},{"kind":"Field","name":{"kind":"Name","value":"fullLevel"}},{"kind":"Field","name":{"kind":"Name","value":"minimumLevel"}},{"kind":"Field","name":{"kind":"Name","value":"deadLevel"}},{"kind":"Field","name":{"kind":"Name","value":"totalActiveStorage"}}]}}]}}]} as unknown as DocumentNode<CustomersQuery, CustomersQueryVariables>;
export const GetPowerSourcesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPowerSources"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPowerSources"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"floodLevel"}},{"kind":"Field","name":{"kind":"Name","value":"fullLevel"}},{"kind":"Field","name":{"kind":"Name","value":"minimumLevel"}},{"kind":"Field","name":{"kind":"Name","value":"deadLevel"}},{"kind":"Field","name":{"kind":"Name","value":"totalActiveStorage"}}]}}]}}]} as unknown as DocumentNode<GetPowerSourcesQuery, GetPowerSourcesQueryVariables>;
export const CustomerSelectionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CustomerSelections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customerSelections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}}]}}]}}]} as unknown as DocumentNode<CustomerSelectionsQuery, CustomerSelectionsQueryVariables>;
export const ChartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Chart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"labels"}},{"kind":"Field","name":{"kind":"Name","value":"declarations"}},{"kind":"Field","name":{"kind":"Name","value":"dispatchs"}},{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"max"}}]}}]}}]} as unknown as DocumentNode<ChartQuery, ChartQueryVariables>;
export const SummaryEnergyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SummaryEnergy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"summaryEnergy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"declaration"}},{"kind":"Field","name":{"kind":"Name","value":"dispatch"}}]}}]}}]} as unknown as DocumentNode<SummaryEnergyQuery, SummaryEnergyQueryVariables>;
export const MonthSummaryEnergyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MonthSummaryEnergy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"monthSummaryEnergy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"declaration"}},{"kind":"Field","name":{"kind":"Name","value":"dispatch"}}]}}]}}]} as unknown as DocumentNode<MonthSummaryEnergyQuery, MonthSummaryEnergyQueryVariables>;
export const WeekSummaryEnergyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WeekSummaryEnergy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weekSummaryEnergy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"declaration"}},{"kind":"Field","name":{"kind":"Name","value":"dispatch"}}]}}]}}]} as unknown as DocumentNode<WeekSummaryEnergyQuery, WeekSummaryEnergyQueryVariables>;
export const DayDeclarationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DayDeclarations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dayDeclarations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"dayId"}},{"kind":"Field","name":{"kind":"Name","value":"powerNo"}},{"kind":"Field","name":{"kind":"Name","value":"totalPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnit"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"decUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fName"}},{"kind":"Field","name":{"kind":"Name","value":"lName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"decCustomerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"disUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fName"}},{"kind":"Field","name":{"kind":"Name","value":"lName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"disCustomerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edited"}},{"kind":"Field","name":{"kind":"Name","value":"decAcknowleged"}},{"kind":"Field","name":{"kind":"Name","value":"disAcknowleged"}},{"kind":"Field","name":{"kind":"Name","value":"originalDetail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnit"}}]}}]}}]}}]} as unknown as DocumentNode<DayDeclarationsQuery, DayDeclarationsQueryVariables>;
export const DayDispatchsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DayDispatchs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dayDispatchs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"dayId"}},{"kind":"Field","name":{"kind":"Name","value":"powerNo"}},{"kind":"Field","name":{"kind":"Name","value":"totalPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnit"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"decUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fName"}},{"kind":"Field","name":{"kind":"Name","value":"lName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"decCustomerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"disUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fName"}},{"kind":"Field","name":{"kind":"Name","value":"lName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"disCustomerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edited"}},{"kind":"Field","name":{"kind":"Name","value":"decAcknowleged"}},{"kind":"Field","name":{"kind":"Name","value":"disAcknowleged"}},{"kind":"Field","name":{"kind":"Name","value":"originalDetail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnit"}}]}}]}}]}}]} as unknown as DocumentNode<DayDispatchsQuery, DayDispatchsQueryVariables>;
export const MonthDeclarationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MonthDeclarations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"monthDeclarations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"monthId"}},{"kind":"Field","name":{"kind":"Name","value":"powerNo"}},{"kind":"Field","name":{"kind":"Name","value":"totalPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnit"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"decUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fName"}},{"kind":"Field","name":{"kind":"Name","value":"lName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"decCustomerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"disUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fName"}},{"kind":"Field","name":{"kind":"Name","value":"lName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"disCustomerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edited"}},{"kind":"Field","name":{"kind":"Name","value":"decAcknowleged"}},{"kind":"Field","name":{"kind":"Name","value":"disAcknowleged"}},{"kind":"Field","name":{"kind":"Name","value":"originalDetail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnit"}}]}}]}}]}}]} as unknown as DocumentNode<MonthDeclarationsQuery, MonthDeclarationsQueryVariables>;
export const MonthDispatchsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MonthDispatchs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"monthDispatchs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"monthId"}},{"kind":"Field","name":{"kind":"Name","value":"powerNo"}},{"kind":"Field","name":{"kind":"Name","value":"totalPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnit"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"decUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fName"}},{"kind":"Field","name":{"kind":"Name","value":"lName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"decCustomerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"disUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fName"}},{"kind":"Field","name":{"kind":"Name","value":"lName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"disCustomerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edited"}},{"kind":"Field","name":{"kind":"Name","value":"decAcknowleged"}},{"kind":"Field","name":{"kind":"Name","value":"disAcknowleged"}},{"kind":"Field","name":{"kind":"Name","value":"originalDetail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnit"}}]}}]}}]}}]} as unknown as DocumentNode<MonthDispatchsQuery, MonthDispatchsQueryVariables>;
export const MonthPowerPurchaseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MonthPowerPurchase"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"monthPowerPurchaseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"monthPowerPurchase"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"monthPowerPurchaseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"monthId"}},{"kind":"Field","name":{"kind":"Name","value":"powerNo"}},{"kind":"Field","name":{"kind":"Name","value":"totalPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnit"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"powers"}},{"kind":"Field","name":{"kind":"Name","value":"remarks"}},{"kind":"Field","name":{"kind":"Name","value":"edited"}},{"kind":"Field","name":{"kind":"Name","value":"decAcknowleged"}},{"kind":"Field","name":{"kind":"Name","value":"disAcknowleged"}}]}}]}}]} as unknown as DocumentNode<MonthPowerPurchaseQuery, MonthPowerPurchaseQueryVariables>;
export const DayPowerPurchaseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DayPowerPurchase"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dayPowerPurchaseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dayPowerPurchase"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dayPowerPurchaseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"dayId"}},{"kind":"Field","name":{"kind":"Name","value":"powerNo"}},{"kind":"Field","name":{"kind":"Name","value":"totalPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnit"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"edited"}},{"kind":"Field","name":{"kind":"Name","value":"decAcknowleged"}},{"kind":"Field","name":{"kind":"Name","value":"disAcknowleged"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"powers"}},{"kind":"Field","name":{"kind":"Name","value":"remarks"}},{"kind":"Field","name":{"kind":"Name","value":"decUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fName"}},{"kind":"Field","name":{"kind":"Name","value":"lName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"decCustomerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"disUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fName"}},{"kind":"Field","name":{"kind":"Name","value":"lName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"disCustomerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reservoirSituation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upstreamLevel"}},{"kind":"Field","name":{"kind":"Name","value":"downstreamLevel"}},{"kind":"Field","name":{"kind":"Name","value":"totalStorage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"average"}}]}},{"kind":"Field","name":{"kind":"Name","value":"activeStorage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"average"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"machinesAvailability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"maxs"}},{"kind":"Field","name":{"kind":"Name","value":"mins"}}]}},{"kind":"Field","name":{"kind":"Name","value":"waterDischarge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"turbineDischarge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"average"}}]}},{"kind":"Field","name":{"kind":"Name","value":"spillwayDischarge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"average"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ecologicalDischarge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"average"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"originalDetail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnit"}},{"kind":"Field","name":{"kind":"Name","value":"details"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"powers"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"remarks"}},{"kind":"Field","name":{"kind":"Name","value":"powers"}}]}}]}}]}}]} as unknown as DocumentNode<DayPowerPurchaseQuery, DayPowerPurchaseQueryVariables>;
export const RolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Roles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"roleId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<RolesQuery, RolesQueryVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"customerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"company"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roleId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fName"}},{"kind":"Field","name":{"kind":"Name","value":"lName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"customers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"company"}}]}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const WeekDeclarationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WeekDeclarations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weekDeclarations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"weekId"}},{"kind":"Field","name":{"kind":"Name","value":"powerNo"}},{"kind":"Field","name":{"kind":"Name","value":"totalPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnit"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"decUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fName"}},{"kind":"Field","name":{"kind":"Name","value":"lName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"decCustomerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"disUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fName"}},{"kind":"Field","name":{"kind":"Name","value":"lName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"disCustomerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edited"}},{"kind":"Field","name":{"kind":"Name","value":"decAcknowleged"}},{"kind":"Field","name":{"kind":"Name","value":"disAcknowleged"}},{"kind":"Field","name":{"kind":"Name","value":"originalDetail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnit"}}]}}]}}]}}]} as unknown as DocumentNode<WeekDeclarationsQuery, WeekDeclarationsQueryVariables>;
export const WeekDispatchsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WeekDispatchs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weekDispatchs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"weekId"}},{"kind":"Field","name":{"kind":"Name","value":"powerNo"}},{"kind":"Field","name":{"kind":"Name","value":"totalPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnit"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"decUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fName"}},{"kind":"Field","name":{"kind":"Name","value":"lName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"decCustomerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"disUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fName"}},{"kind":"Field","name":{"kind":"Name","value":"lName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"disCustomerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edited"}},{"kind":"Field","name":{"kind":"Name","value":"decAcknowleged"}},{"kind":"Field","name":{"kind":"Name","value":"disAcknowleged"}},{"kind":"Field","name":{"kind":"Name","value":"originalDetail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnit"}}]}}]}}]}}]} as unknown as DocumentNode<WeekDispatchsQuery, WeekDispatchsQueryVariables>;
export const AllWeeklyDocumentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllWeeklyDocument"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allWeeklyDocument"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"weekId"}},{"kind":"Field","name":{"kind":"Name","value":"powerNo"}},{"kind":"Field","name":{"kind":"Name","value":"totalPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnit"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"decUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fName"}},{"kind":"Field","name":{"kind":"Name","value":"lName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"decCustomerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"disUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fName"}},{"kind":"Field","name":{"kind":"Name","value":"lName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"disCustomerId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"abbreviation"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edited"}},{"kind":"Field","name":{"kind":"Name","value":"decAcknowleged"}},{"kind":"Field","name":{"kind":"Name","value":"disAcknowleged"}}]}}]}}]} as unknown as DocumentNode<AllWeeklyDocumentQuery, AllWeeklyDocumentQueryVariables>;
export const WeekPowerPurchaseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WeekPowerPurchase"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"weekPowerPurchaseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weekPowerPurchase"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"weekPowerPurchaseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"weekId"}},{"kind":"Field","name":{"kind":"Name","value":"powerNo"}},{"kind":"Field","name":{"kind":"Name","value":"totalPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnit"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"powers"}},{"kind":"Field","name":{"kind":"Name","value":"remarks"}},{"kind":"Field","name":{"kind":"Name","value":"edited"}},{"kind":"Field","name":{"kind":"Name","value":"decAcknowleged"}},{"kind":"Field","name":{"kind":"Name","value":"disAcknowleged"}}]}}]}}]} as unknown as DocumentNode<WeekPowerPurchaseQuery, WeekPowerPurchaseQueryVariables>;
export const DayReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DayReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dayReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"queryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dayId"}},{"kind":"Field","name":{"kind":"Name","value":"powerNo"}},{"kind":"Field","name":{"kind":"Name","value":"totalPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalUnit"}},{"kind":"Field","name":{"kind":"Name","value":"remark"}},{"kind":"Field","name":{"kind":"Name","value":"powers"}},{"kind":"Field","name":{"kind":"Name","value":"remarks"}}]}}]}}]} as unknown as DocumentNode<DayReportQuery, DayReportQueryVariables>;
export const GetReportYesterDayDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReportYesterDay"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getReportYesterDay"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"customerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asYesterday"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"fullLevel"}},{"kind":"Field","name":{"kind":"Name","value":"minimumLevel"}},{"kind":"Field","name":{"kind":"Name","value":"totalActiveStorage"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}}]}}]}}]} as unknown as DocumentNode<GetReportYesterDayQuery, GetReportYesterDayQueryVariables>;