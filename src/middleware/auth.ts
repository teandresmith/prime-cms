import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../helpers/token'
import { LoginModel } from '../database/database'
import { Login } from '../interfaces/login.interface'
import { options } from '../controllers/statics'

export const Authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req?.headers?.authorization

  if (token === undefined) {
    res.status(401).json({ message: options.NO_TOKEN })
    return
  }

  try {
    token = token?.replace('Bearers ', '')
    const verify = await verifyToken(token)

    if (!verify) {
      res.status(401).json({ message: options.INVALID_TOKEN })
      return
    }
    const user: Login = await LoginModel.findOne({ token: token })

    if (!user) {
      res.status(401).json({ message: options.NO_AUTH })
      return
    }
  } catch (error) {
    console.error(error)
    res.status(401).json({ message: options.NO_AUTH })
    return
  }

  next()
}
