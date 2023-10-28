import { useAuth } from '~/common/context/useAuth'
import { Role } from './util'

interface IProtectedRoutesProps {
  children: React.ReactNode
  role: Role[]
}

const ProtectedRoutes = ({ children, role }: IProtectedRoutesProps) => {
  const { authInfo } = useAuth()

  return authInfo?.isAuthenticated && role.includes(authInfo?.roles as Role) ? <div>{children}</div> : <div>403</div>
}

export default ProtectedRoutes
