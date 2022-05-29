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

  token = token?.replace('Bearers ', '')
  if (!verifyToken(token)) {
    res.status(401).json({ message: options.INVALID_TOKEN })
    return
  }

  try {
    const user: Login = await LoginModel.findOne({ token: token })

    if (!user) {
      res.status(401).json({ message: options.NO_AUTH })
      return
    }
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: options.NO_AUTH })
    return
  }

  next()
}
