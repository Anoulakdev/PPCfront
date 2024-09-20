import { create } from 'zustand'
import { CustomerDataType } from 'src/types/customerType'
import { Action } from '@/globalState'

export interface CustomerType {
  customer: CustomerDataType | null
  action: Action | ''
  setCustomer: (customer: CustomerDataType) => void
  resetCustomer: () => void
  setCustomerAction: (action: Action) => void
}
const initialState: CustomerDataType = {
  _id: '',
  abbreviation: '',
  company: '',
  name: '',
  phone: '',
  email: '',
  address: '',
  unit: 1
}

export const useCustomer = create<CustomerType>(set => ({
  customer: null,
  action: '',
  setCustomer: (customer: CustomerDataType) => {
    set(state => ({
      customer: { ...state.customer, ...customer } as CustomerDataType
    }))
  },
  resetCustomer: () => {
    set(() => ({
      customer: initialState,
      action: ''
    }))
  },
  setCustomerAction: (action: Action) => {
    set(() => ({
      action: action
    }))
  }
}))
