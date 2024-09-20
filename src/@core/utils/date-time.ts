import moment from 'moment'

export const FormatDate = (date: string): string => {
  return moment(date).format('DD/MM/YYYY')
}

export const FormatDateTime = (date: string): string => {
  return moment(date).format('DD/MM/YYYY HH:mm')
}

export const GetFullYear = (): number => {
  return new Date().getFullYear()
}

export const GetFullMonth = (): string => {
  const currentDate = new Date()

  return String(currentDate.getMonth() + 1).padStart(2, '0')
}

export const GetYearAndMonth = (): string => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')

  return `${year}/${month}`
}

export const GetStartYear = (): string => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const formattedDate = `${year}-01-01`

  return formattedDate
}

export const GetEndYear = (): string => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const formattedDate = `${year}-12-31`

  return formattedDate
}

export const GetStartMonth = (): string => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const formattedDate = `${year}-${month}-01`

  return formattedDate
}

export const GetEndMonth = (): string => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const endDay = CountDaysInMonth(year, currentDate.getMonth() + 1)
  const formattedDate = `${year}-${month}-${endDay}`

  return formattedDate
}
export const GetDay = (): string => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0') // Adding 1 to the month because it's 0-based.
  const day = String(currentDate.getDate()).padStart(2, '0')

  const formattedDate = `${year}-${month}-${day}`

  return formattedDate
}
export const GetYesterday = (): string => {
  const today = new Date()
  const yesterdayDate = new Date(today.getTime() - 86400000)
  const year = yesterdayDate.getFullYear()
  const month = String(yesterdayDate.getMonth() + 1).padStart(2, '0') // Adding 1 to the month because it's 0-based.
  const day = String(yesterdayDate.getDate()).padStart(2, '0')

  const formattedDate = `${year}-${month}-${day}`

  return formattedDate
}

export const CountDaysInMonth = (year: number, month: number): number => {
  const date = new Date(year, month, 1)

  date.setMonth(date.getMonth() + 1)
  date.setDate(date.getDate() - 1)

  return date.getDate()
}

// Get start and en of the week
export const GetStartAndEndDateOfWeek = (): { startWeek: string; endWeek: string } => {
  const today = new Date()
  const currentDayOfWeek = today.getDay()

  const startDate = new Date(today)
  startDate.setDate(today.getDate() - currentDayOfWeek + 1)

  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 6)

  return { startWeek: moment(startDate).format('YYYY-MM-DD'), endWeek: moment(endDate).format('YYYY-MM-DD') }
}

export const GetStartAndEndDateOfWeekByNumber = (
  weekNumber: number,
  year: number
): { startDate: string; endDate: string } => {
  const januaryFirst = new Date(year, 0, 1)
  const daysUntilTargetWeek = (weekNumber - 1) * 7
  const startDate = new Date(januaryFirst.getTime() + daysUntilTargetWeek * 24 * 60 * 60 * 1000)

  const endDate = new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000)

  return { startDate: moment(startDate).format('YYYY-MM-DD'), endDate: moment(endDate).format('YYYY-MM-DD') }
}

export const GetCurrentWeekNumber = (): number => {
  const today = new Date()
  const firstDayOfYear: Date = new Date(today.getFullYear(), 0, 1)
  const daysElapsed = Math.floor((today.getTime() - firstDayOfYear.getTime()) / 86400000)
  const weekNumber = Math.ceil((daysElapsed + firstDayOfYear.getDay() + 1) / 7)

  return weekNumber
}
