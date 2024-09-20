import { CustomerDataType } from './customerType'
import { RoleDataType } from './roleType'

export interface UserInputType {
  _id?: string
  fName: string
  lName: string
  phone: string
  email: string
  password: string
  conFirmPassword: string
  roleId?: RoleDataType | null
  customerId?: CustomerDataType | null
  customers?: CustomerDataType[] | []
}
export interface UserDataType {
  _id?: string
  fName: string
  lName: string
  phone: string
  email: string
  roleId?: RoleDataType
  customerId?: CustomerDataType
  customers?: CustomerDataType[] | []
}
