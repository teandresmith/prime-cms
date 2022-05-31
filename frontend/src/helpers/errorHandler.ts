import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import Cookies from 'js-cookie'
import { NavigateFunction } from 'react-router-dom'

export const checkError = (
  error: FetchBaseQueryError,
  navigate: NavigateFunction
) => {
  if (
    error?.status === 401 &&
    (error?.data as { message: string }).message === 'Token is invalid'
  ) {
    Cookies.remove('token')
    localStorage.removeItem('currentProject')
    localStorage.removeItem('currentCollection')
  }
}
