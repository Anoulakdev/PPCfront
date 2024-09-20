// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios

// ** Config
import authConfig from 'src/configs/auth'

// ** Store
import stores from '@/stores/index'

// ** Graphql
import { useQuery, useMutation } from '@apollo/client'
import { LOGIN } from '@/lib/mutation'
import { GET_ME } from '@/lib/query'
import { LoginInput } from '@/__generated__/graphql'

// ** Types
import { AuthValuesType, ErrCallbackType, UserDataType } from './types'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  // ** Store
  const { setRole } = stores.useRole()
  const { setCustomer } = stores.useCustomer()

  // ** Graphql
  const { data, loading: meLoading, error: meError } = useQuery(GET_ME)
  const [login] = useMutation(LOGIN, {
    onCompleted: data => {
      // console.log('User Data====>', data)

      if (data.login) {
        const { accessToken, data: userData } = data.login
        window.localStorage.setItem(authConfig.storageTokenKeyName, accessToken)
        const returnUrl = router.query.returnUrl
        const cus = userData.customerId
        setUser({ ...userData, role: 'admin' })
        if (userData.customerId) {
          setCustomer({
            _id: cus?._id,
            name: cus?.name || '',
            phone: cus?.phone || '',
            email: cus?.email || '',
            unit: cus?.unit || 1,
            type: cus?.type,
            floodLevel: cus?.floodLevel || 0,
            fullLevel: cus?.fullLevel || 0,
            minimumLevel: cus?.minimumLevel || 0,
            deadLevel: cus?.deadLevel || 0,
            totalActiveStorage: cus?.totalActiveStorage || 0
          })
        }
        if (userData.roleId) {
          setRole({
            _id: userData.roleId._id,
            name: userData.roleId.name,
            paths: userData.roleId.paths
          })
        }
        window.localStorage.setItem('userData', JSON.stringify(userData))

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        router.replace(redirectURL as string)
      }
    }
  })

  useEffect(() => {
    const initAuth = () => {
      setLoading(meLoading)
      if (data?.me && !meLoading) {
        setLoading(meLoading)
        if (data.me?.data.roleId) {
          // setRole(data.me?.data.roleId)
          setRole({
            _id: data.me?.data.roleId._id,
            name: data.me?.data.roleId.name,
            paths: data.me?.data.roleId.paths
          })
          setCustomer({
            _id: data.me.data.customerId?._id,
            name: data.me.data.customerId?.name || '',
            phone: data.me.data.customerId?.phone || '',
            email: data.me.data.customerId?.email || '',
            unit: data.me.data.customerId?.unit || 1,
            type: data.me.data.customerId?.type || 1,
            floodLevel: data.me.data.customerId?.floodLevel || 0,
            fullLevel: data.me.data.customerId?.fullLevel || 0,
            minimumLevel: data.me.data.customerId?.minimumLevel || 0,
            deadLevel: data.me.data.customerId?.deadLevel || 0,
            totalActiveStorage: data.me.data.customerId?.totalActiveStorage || 0
          })
        }
        setUser({ ...data.me?.data, role: 'admin' })
      }

      if (meError && !meLoading) {
        // console.log('Error===>', meError)

        localStorage.removeItem('userData')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('accessToken')
        setUser(null)
        setLoading(meLoading)
        if (!router.pathname.includes('login')) {
          router.replace('/login')
        }
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meLoading])

  const handleLogin = async (params: LoginInput, errorCallback?: ErrCallbackType) => {
    try {
      await login({ variables: { loginInput: params } })
    } catch (error) {
      if (errorCallback) errorCallback(error)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
