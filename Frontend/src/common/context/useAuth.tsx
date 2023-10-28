import { createContext, useContext, useState } from 'react'
import { Role } from '~/routes/util'

export interface AuthInfo {
  roles: Role
  isAuthenticated: boolean
}

export interface IAuthContext {
  authInfo: AuthInfo | null
  setAuthInfo: (data: AuthInfo | null) => void
}

export interface IProps {
  children?: React.ReactNode
}

export const AuthContext = createContext<IAuthContext>({
  authInfo: null,
  setAuthInfo: () => 1
})

export const AuthProvider = (props: IProps) => {
  const [auth, setAuth] = useState<AuthInfo | null>(null)

  const setAuthInfo = (data: AuthInfo | null) => {
    setAuth(data)
  }

  return <AuthContext.Provider value={{ authInfo: auth, setAuthInfo }}>{props.children}</AuthContext.Provider>
}

export const AuthConsumer = AuthContext.Consumer

export const useAuth = () => useContext(AuthContext)
