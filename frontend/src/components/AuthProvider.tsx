import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/reduxHooks'

type AuthProviderProps = {
  children: any
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const userToken = useAppSelector((state) => state.cm.userToken)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname !== '/' && !userToken) {
      navigate('/')
    }
  }, [userToken])
  return children
}

export default AuthProvider
