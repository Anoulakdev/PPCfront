import { LoginInput } from '@/__generated__/graphql'

export type ErrCallbackType = (err: unknown) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type UserDataType = {
  _id: string
  role: string
  fName: string
  lName: string
  email: string
  phone: string
  avatar?: string | null
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginInput, errorCallback?: ErrCallbackType) => void
}
