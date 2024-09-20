import { create } from 'zustand'
import { UserDataType } from 'src/types/userType'
import { Action } from '@/globalState'

export interface User {
  user: UserDataType
  action: Action | ''
  setUser: (user: UserDataType) => void
  resetUser: () => void
  setUserAction: (action: Action) => void
}
const initialState: UserDataType = {
  _id: '',
  fName: '',
  lName: '',
  email: '',
  phone: ''
}

export const useUser = create<User>(set => ({
  user: initialState,
  action: '',
  setUser: (user: UserDataType) => {
    set(state => ({
      user: { ...state.user, ...user } as UserDataType
    }))
  },
  resetUser: () => {
    set(() => ({
      user: initialState,
      action: ''
    }))
  },
  setUserAction: (action: Action) => {
    set(() => ({
      action: action
    }))
  }
}))
