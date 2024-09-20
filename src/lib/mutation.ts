import { gql } from '@/__generated__/gql'

// ** Author
export const LOGIN = gql(`
mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    accessToken
    data {
      _id
      fName
      lName
      email
      phone
      roleId {
        _id
        name
        paths
        permissions
      }
      customerId {
        email
        logo
        name
        phone
        unit
        type
        _id
        minimumLevel
        totalActiveStorage
        floodLevel
        fullLevel
        deadLevel
        abbreviation
      }
    }
  }
}
`)

// *R* Report
export const CREATE_DAILY_REORT = gql(`
mutation CreateReport($createReportInput: CreateReportInput!) {
  createReport(createReportInput: $createReportInput) {
    _id
    decCustomerId {
      _id
      abbreviation
      address
      company
      name
      phone
    }
    disCustomerId {
      _id
      abbreviation
      address
      company
      name
      phone
    }
  }
}
`)

// *C* Customer
export const CREATE_DAILY_DECLARATION = gql(`
mutation CreateDayDeclaration($createDayDeclarationInput: CreateDayPowerPurchaseInput!) {
  createDayDeclaration(createDayDeclarationInput: $createDayDeclarationInput) {
    _id
    createdAt
    updatedAt
    dayId
    powerNo
    totalPower
    totalUnit
    decCustomerId {
      _id
      abbreviation
      address
      company
      name
      phone
    }
    disCustomerId {
      _id
      abbreviation
      address
      company
      name
      phone
    }
  }
}
`)
export const CREATE_WEEK_DECLARATION = gql(`
mutation CreateWeekPowerPurchase($createWeekPowerPurchaseInput: CreateWeekPowerPurchaseInput!) {
  createWeekPowerPurchase(createWeekPowerPurchaseInput: $createWeekPowerPurchaseInput) {
    _id
    createdAt
    updatedAt
    weekId
    powerNo
    totalPower
    totalUnit
    decCustomerId {
      _id
      abbreviation
      address
      company
      name
      phone
    }
    disCustomerId {
      _id
      abbreviation
      address
      company
      name
      phone
    }
  }
}
`)

export const ACKNOWLEDGED_DAY_DISPATCH = gql(`
mutation AcknowledgedDayDispatch($acknowledgedDayDispatchInput: UpdateDayPowerPurchaseInput!) {
  acknowledgedDayDispatch(acknowledgedDayDispatchInput: $acknowledgedDayDispatchInput) {
    _id
    createdAt
    updatedAt
    dayId
    powerNo
    totalPower
    totalUnit
  }
}
`)
export const ACKNOWLEDGED_DAY_DECLARATION = gql(`
mutation AcknowledgedDayDeclaration($acknowledgedDayDeclarationInput: UpdateDayPowerPurchaseInput!) {
  acknowledgedDayDeclaration(acknowledgedDayDeclarationInput: $acknowledgedDayDeclarationInput) {
    _id
    createdAt
    updatedAt
    dayId
    powerNo
    totalPower
    totalUnit
  }
}
`)

// *C* Customer
export const CREATE_CUSTOMER = gql(`
mutation CreateCustomer($createCustomerInput: CreateCustomerInput!) {
  createCustomer(createCustomerInput: $createCustomerInput) {
    _id
    type
    name
    company
    abbreviation
    email
    logo
    unit
    address
    phone
  }
}
`)
export const UPDATE_CUSTOMER = gql(`
mutation UpdateCustomer($updateCustomerInput: UpdateCustomerInput!) {
  updateCustomer(updateCustomerInput: $updateCustomerInput) {
    _id
    type
    name
    company
  }
}
`)
export const DEL_CUSTOMER = gql(`
mutation RemoveCustomer($removeCustomerId: String!) {
  removeCustomer(id: $removeCustomerId) {
    _id
    type
    name
    company
  }
}
`)

// *U* User
export const CREATE_USER = gql(`
mutation CreateUser($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput) {
    _id
    fName
    lName
    email
    phone
  }
}
`)
export const UPDATE_USER = gql(`
mutation UpdateUser($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput: $updateUserInput) {
    _id
    fName
    lName
    email
    phone
  }
}
`)
export const DEL_USER = gql(`
mutation RemoveUser($removeUserId: String!) {
  removeUser(id: $removeUserId) {
    _id
    fName
    lName
    email
    phone
  }
}
`)

// Weekly
export const WEEK_ACKNOWLEDGED_DEC = gql(`
mutation AcknowledgedWeekDeclaration($acknowledgedWeekDeclaration: UpdateWeekPowerPurchaseInput!) {
  acknowledgedWeekDeclaration(acknowledgedWeekDeclaration: $acknowledgedWeekDeclaration) {
    _id
    createdAt
    updatedAt
    totalPower
    totalUnit
  }
}
`)
export const WEEK_ACKNOWLEDGED_DIS = gql(`
mutation AcknowledgedWeekDispatch($acknowledgedWeekDispatch: UpdateWeekPowerPurchaseInput!) {
  acknowledgedWeekDispatch(acknowledgedWeekDispatch: $acknowledgedWeekDispatch) {
    _id
    createdAt
    updatedAt
    totalPower
    totalUnit
  }
}
`)

// Month
export const MONTH_CREATE_DECLARATION = gql(`
mutation CreateMonthPowerPurchase($createMonthPowerPurchaseInput: CreateMonthPowerPurchaseInput!) {
  createMonthPowerPurchase(createMonthPowerPurchaseInput: $createMonthPowerPurchaseInput) {
    _id
    createdAt
    updatedAt
    monthId
    powerNo
    totalPower
    totalUnit
    decCustomerId {
      _id
      abbreviation
      address
      company
      name
      phone
    }
    disCustomerId {
      _id
      abbreviation
      address
      company
      name
      phone
    }
  }
}
`)
export const MONTH_ACKNOWLEDGED_DEC = gql(`
mutation AcknowledgedMonthDeclaration($acknowledgedMonthDeclaration: UpdateMonthPowerPurchaseInput!) {
  acknowledgedMonthDeclaration(acknowledgedMonthDeclaration: $acknowledgedMonthDeclaration) {
    _id
    createdAt
    updatedAt
    totalPower
    totalUnit
  }
}
`)
export const MONTH_ACKNOWLEDGED_DIS = gql(`
mutation AcknowledgedMonthDispatch($acknowledgedMonthDispatch: UpdateMonthPowerPurchaseInput!) {
  acknowledgedMonthDispatch(acknowledgedMonthDispatch: $acknowledgedMonthDispatch) {
    _id
    createdAt
    updatedAt
    totalPower
    totalUnit
  }
}
`)
