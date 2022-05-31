import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/reduxHooks'
import Cookies from 'js-cookie'

type AuthProviderProps = {
  children: any
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const userToken = useAppSelector((state) => state.cm.userToken)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname !== '/' && (!userToken || !Cookies.get('token'))) {
      navigate('/')
    }
  }, [userToken, location, navigate])
  return children
}

export default AuthProvider
