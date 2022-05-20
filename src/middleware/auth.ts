import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../helpers/token'
import { LoginModel } from '../database/database'
import { Login } from '../interfaces/login.interface'

export const Authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req?.headers?.authorization

  if (token === '') {
    res.status(401).json({ message: 'Token not Provided' })
  }

  token = token?.replace('Bearers ', '')
  if (!verifyToken(token as string)) {
    res.status(401).json({ message: 'Invalid Token' })
  }

  try {
    const user: Login = await LoginModel.findOne({ token: token })

    if (!user) {
      res.status(401).json({ message: 'User not found.' })
    }
  } catch (error) {
    console.log(error)
  }

  next()
}
