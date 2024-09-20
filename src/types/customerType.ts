export interface CustomerDataType {
  _id?: string
  abbreviation?: string
  company?: string
  name: string
  phone: string
  email: string
  address?: string
  unit: number
  type?: number
  floodLevel: number
  fullLevel: number
  minimumLevel: number
  deadLevel: number
  totalActiveStorage: number
}
export interface CustomerSelectDataType {
  _id?: string
  abbreviation: string
  company: string
  name: string
}
