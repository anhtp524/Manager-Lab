import { createContext, useContext, useState } from 'react'
import { ProfileUser } from '~/api/user.api'
import { Role } from '~/routes/util'

export interface AuthInfo {
  roles: Role
  isAuthenticated: boolean
}

export interface IAuthContext {
  authInfo: AuthInfo | null
  setAuthInfo: (data: AuthInfo | null) => void
  profileUserInfo: ProfileUser | null
  setProfileUserInfo: (data: ProfileUser | null) => void
}

export interface IProps {
  children?: React.ReactNode
}

export const AuthContext = createContext<IAuthContext>({
  authInfo: null,
  setAuthInfo: () => 1,
  profileUserInfo: null,
  setProfileUserInfo: () => 1
})

export const AuthProvider = (props: IProps) => {
  const [auth, setAuth] = useState<AuthInfo | null>(null)
  const [profileUser, setProfileUser] = useState<ProfileUser | null>(null)

  const setAuthInfo = (data: AuthInfo | null) => {
    setAuth(data)
  }

  const setProfileUserInfo = (data: ProfileUser | null) => {
    setProfileUser(data)
  }

  return (
    <AuthContext.Provider value={{ authInfo: auth, setAuthInfo, profileUserInfo: profileUser, setProfileUserInfo }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export const AuthConsumer = AuthContext.Consumer

export const useAuth = () => useContext(AuthContext)
