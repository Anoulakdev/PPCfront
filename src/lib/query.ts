import { gql } from '@/__generated__/gql'

// *A* Author
export const GET_ME = gql(`
query Me {
  me {
    accessToken
    data {
      _id
      userId
      roleId {
        _id
        name
        paths
        permissions
      }
      fName
      lName
      email
      phone
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
export const ALL_DOCUMENT = gql(`
query Documents($docType: String!, $queryInput: QueryInput) {
  documents(docType: $docType, queryInput: $queryInput) {
    _id
    createdAt
    powerNo
    declaration
    dispatch
    dis_dec
    edited
    decAcknowleged
    disAcknowleged
  }
}
`)

// *C* Report
export const REPORTS = gql(`
query Reports($queryInput: QueryInput) {
  reports(queryInput: $queryInput) {
    _id
    createdAt
    updatedAt
    reportId
    powerNo
    totalPower
    totalUnit
    remark
    powers
    remarks
    edited
    waterLevel
    dwy
    dwf
    pws
    rainFall
    netEnergyOutput
    waterRate
    decCustomerId {
      _id
      company
      name
      phone
      abbreviation
    }
    disCustomerId {
      abbreviation
      company
      name
      phone
      _id
    }
    inflow {
      amount
      volume
    }
    outFlow {
      amount
      volume
    }
    otherWaterReleased {
      amount
      volume
    }
    spillWay {
      amount
      volume
    }
    activeStorage {
      amount
      average
    }
  }
}
`)

// *C* Customer
export const CUSTOMERS = gql(`
query Customers($queryInput: QueryInput) {
  customers(queryInput: $queryInput) {
    _id
    createdAt
    updatedAt
    type
    name
    company
    abbreviation
    email
    logo
    unit
    address
    phone
    floodLevel
    fullLevel
    minimumLevel
    deadLevel
    totalActiveStorage
  }
}
`)
export const POWER_SOURCES = gql(`
query GetPowerSources {
  getPowerSources {
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
    floodLevel
    fullLevel
    minimumLevel
    deadLevel
    totalActiveStorage
  }
}
`)
export const CUSTOMER_SELECTION = gql(`
query CustomerSelections {
  customerSelections {
    _id
    name
    company
    abbreviation
  }
}
`)

// *D* Dashboard
export const CHART = gql(`
query Chart($queryInput: QueryInput) {
  chart(queryInput: $queryInput) {
    labels
    declarations
    dispatchs
    min
    max
  }
}
`)
export const SUMMARY_ENERGY = gql(`
query SummaryEnergy($queryInput: QueryInput) {
  summaryEnergy(queryInput: $queryInput) {
    declaration
    dispatch
  }
}
`)
export const MONTH_SUMMARY_ENERGY = gql(`
query MonthSummaryEnergy($queryInput: QueryInput) {
  monthSummaryEnergy(queryInput: $queryInput) {
    declaration
    dispatch
  }
}
`)
export const WEEK_SUMMARY_ENERGY = gql(`
query WeekSummaryEnergy($queryInput: QueryInput) {
  weekSummaryEnergy(queryInput: $queryInput) {
    declaration
    dispatch
  }
}
`)

// *D* DailyDeclarations
export const DAILYDECLARATIONS = gql(`
query DayDeclarations($queryInput: QueryInput) {
  dayDeclarations(queryInput: $queryInput) {
     _id
    createdAt
    updatedAt
    dayId
    powerNo
    totalPower
    totalUnit
    remark
    decUserId {
      _id
      email
      fName
      lName
      phone
    }
    decCustomerId {
      _id
      abbreviation
      address
      company
      name
      phone
      logo
      type
      unit
      email
    }
    disUserId {
      _id
      email
      fName
      lName
      phone
    }
    disCustomerId {
      _id
      abbreviation
      address
      company
      name
      phone
      logo
      type
      unit
    }
    edited
    decAcknowleged
    disAcknowleged
    originalDetail {
      totalPower
      totalUnit
    }
  }
}
`)
export const DAILYDISPATCHS = gql(`
query DayDispatchs($queryInput: QueryInput) {
  dayDispatchs(queryInput: $queryInput) {
    _id
    createdAt
    updatedAt
    dayId
    powerNo
    totalPower
    totalUnit
    remark
    decUserId {
      _id
      email
      fName
      lName
      phone
    }
    decCustomerId {
      _id
      abbreviation
      address
      company
      name
      phone
      logo
      type
      unit
      email
    }
    disUserId {
      _id
      email
      fName
      lName
      phone
    }
    disCustomerId {
      _id
      abbreviation
      address
      company
      name
      phone
      logo
      type
      unit
    }
    edited
    decAcknowleged
    disAcknowleged
    originalDetail {
      totalPower
      totalUnit
    }
  }
}
`)

// Month
export const MONTH_DEC = gql(`
query MonthDeclarations($queryInput: QueryInput) {
  monthDeclarations(queryInput: $queryInput) {
     _id
    createdAt
    updatedAt
    monthId
    powerNo
    totalPower
    totalUnit
    remark
    decUserId {
      _id
      email
      fName
      lName
      phone
    }
    decCustomerId {
      _id
      abbreviation
      address
      company
      name
      phone
      logo
      type
      unit
      email
    }
    disUserId {
      _id
      email
      fName
      lName
      phone
    }
    disCustomerId {
      _id
      abbreviation
      address
      company
      name
      phone
      logo
      type
      unit
    }
    edited
    decAcknowleged
    disAcknowleged
    originalDetail {
      totalPower
      totalUnit
    }
  }
}
`)
export const MONTH_DIS = gql(`
query MonthDispatchs($queryInput: QueryInput) {
  monthDispatchs(queryInput: $queryInput) {
     _id
    createdAt
    updatedAt
    monthId
    powerNo
    totalPower
    totalUnit
    remark
    decUserId {
      _id
      email
      fName
      lName
      phone
    }
    decCustomerId {
      _id
      abbreviation
      address
      company
      name
      phone
      logo
      type
      unit
      email
    }
    disUserId {
      _id
      email
      fName
      lName
      phone
    }
    disCustomerId {
      _id
      abbreviation
      address
      company
      name
      phone
      logo
      type
      unit
    }
    edited
    decAcknowleged
    disAcknowleged
    originalDetail {
      totalPower
      totalUnit
    }
  }
}
`)
export const MONTH_PPC = gql(`
query MonthPowerPurchase($monthPowerPurchaseId: String!) {
  monthPowerPurchase(id: $monthPowerPurchaseId) {
    _id
    createdAt
    updatedAt
    monthId
    powerNo
    totalPower
    totalUnit
    remark
    powers
    remarks
    edited
    decAcknowleged
    disAcknowleged
  }
}
`)

// *P* Power Purchase
export const DAILY_POWER_PURCHASE = gql(`
query DayPowerPurchase($dayPowerPurchaseId: String!) {
  dayPowerPurchase(id: $dayPowerPurchaseId) {
    _id
    createdAt
    updatedAt
    dayId
    powerNo
    totalPower
    totalUnit
    remark
    edited
    decAcknowleged
    disAcknowleged
    price
    powers
    remarks
    decUserId {
      _id
      email
      fName
      lName
      phone
    }
    decCustomerId {
      _id
      abbreviation
      address
      company
      name
      phone
      logo
      type
      unit
      email
    }
    disUserId {
      _id
      email
      fName
      lName
      phone
    }
    disCustomerId {
      _id
      abbreviation
      address
      company
      name
      phone
      logo
      type
      unit
      email
    }
    reservoirSituation {
      upstreamLevel
      downstreamLevel
      totalStorage {
        amount
        average
      }
      activeStorage {
        amount
        average
      }
    }
    machinesAvailability {
      maxs
      mins
    }
    waterDischarge {
      turbineDischarge {
        amount
        average
      }
      spillwayDischarge {
        amount
        average
      }
      ecologicalDischarge {
        amount
        average
      }
    }
    originalDetail {
      totalPower
      totalUnit
      details {
        powers
        title
      }
      remarks
      powers
    }
  }
}
`)

// *R* Role
export const ROLES = gql(`
query Roles($queryInput: QueryInput) {
  roles(queryInput: $queryInput) {
    _id
    roleId
    name
    createdAt
    updatedAt
  }
}
`)

// *U* User
export const USERS = gql(`
query Users($queryInput: QueryInput) {
  users(queryInput: $queryInput) {
    _id
    createdAt
    updatedAt
    userId
    customerId {
      _id
      name
      phone
      type
      company
    }
    roleId {
      _id
      name
    }
    fName
    lName
    email
    phone
    customers {
      _id
      name
      phone
      type
      company
    }
  }
}
`)

// Week
export const WEEK_DEC = gql(`
query WeekDeclarations($queryInput: QueryInput) {
  weekDeclarations(queryInput: $queryInput) {
     _id
    createdAt
    updatedAt
    weekId
    powerNo
    totalPower
    totalUnit
    remark
    decUserId {
      _id
      email
      fName
      lName
      phone
    }
    decCustomerId {
      _id
      abbreviation
      address
      company
      name
      phone
      logo
      type
      unit
      email
    }
    disUserId {
      _id
      email
      fName
      lName
      phone
    }
    disCustomerId {
      _id
      abbreviation
      address
      company
      name
      phone
      logo
      type
      unit
    }
    edited
    decAcknowleged
    disAcknowleged
    originalDetail {
      totalPower
      totalUnit
    }
  }
}
`)
export const WEEK_DIS = gql(`
query WeekDispatchs($queryInput: QueryInput) {
  weekDispatchs(queryInput: $queryInput) {
     _id
    createdAt
    updatedAt
    weekId
    powerNo
    totalPower
    totalUnit
    remark
    decUserId {
      _id
      email
      fName
      lName
      phone
    }
    decCustomerId {
      _id
      abbreviation
      address
      company
      name
      phone
      logo
      type
      unit
      email
    }
    disUserId {
      _id
      email
      fName
      lName
      phone
    }
    disCustomerId {
      _id
      abbreviation
      address
      company
      name
      phone
      logo
      type
      unit
    }
    edited
    decAcknowleged
    disAcknowleged
    originalDetail {
      totalPower
      totalUnit
    }
  }
}
`)

export const WEEK_ALL_DOCUMENT = gql(`
query AllWeeklyDocument($queryInput: QueryInput) {
  allWeeklyDocument(queryInput: $queryInput) {
    _id
    createdAt
    updatedAt
    weekId
    powerNo
    totalPower
    totalUnit
    remark
    decUserId {
      _id
      email
      fName
      lName
      phone
    }
    decCustomerId {
      _id
      abbreviation
      address
      company
      name
      phone
      logo
      type
      unit
      email
    }
    disUserId {
      _id
      email
      fName
      lName
      phone
    }
    disCustomerId {
      _id
      abbreviation
      address
      company
      name
      phone
      logo
      type
      unit
    }
    edited
    decAcknowleged
    disAcknowleged
  }
}
`)
export const WEEK_POWER_PURCHASE = gql(`
query WeekPowerPurchase($weekPowerPurchaseId: String!) {
  weekPowerPurchase(id: $weekPowerPurchaseId) {
     _id
    createdAt
    updatedAt
    weekId
    powerNo
    totalPower
    totalUnit
    remark
    powers
    remarks
    edited
    decAcknowleged
    disAcknowleged
  }
}
`)

// *R* Report
export const DAY_REPORT = gql(`
query DayReport($queryInput: QueryInput) {
  dayReport(queryInput: $queryInput) {
    _id
    createdAt
    dayId
    powerNo
    totalPower
    totalUnit
    remark
    powers
    remarks
  }
}
`)
export const GET_REPORT_YESTERDAY = gql(`
query GetReportYesterDay($customerId: String!) {
  getReportYesterDay(customerId: $customerId) {
       asYesterday
    customer {
      _id
      fullLevel
      minimumLevel
      totalActiveStorage
      unit
    }
  }
}
`)
