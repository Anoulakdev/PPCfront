import { create } from 'zustand'
import { RoleDataType } from 'src/types/roleType'

interface Role {
  role: RoleDataType
  setRole: (role: RoleDataType) => void
}
const initialState: RoleDataType = {
  _id: '',
  name: '',
  paths: [],
  permissions: []
}

export const useRole = create<Role>(set => ({
  role: initialState,
  setRole: (user: RoleDataType) => {
    set(state => ({
      role: { ...state.role, ...user } as RoleDataType
    }))
  }
}))
