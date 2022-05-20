import { Request, Response } from 'express'
import { generateToken } from '../helpers/token'
import { Login } from '../interfaces/login.interface'
import { LoginModel } from '../database/database'
import { verifyPassword } from '../helpers/password'

export const login = async (req: Request, res: Response) => {
  const user: Login = {
    email: req?.body?.email,
    password: req?.body?.password,
  }

  if (user.email === '' || user.password === '') {
    res.status(400).json({ message: 'Did not provide email or password' })
  }

  try {
    const info = await LoginModel.findOne({ email: user.email })

    if (!info || info?.length === 0) {
      res.status(500).json({ message: 'Login failed' })
    }

    if (verifyPassword(info?.password, user.password)) {
      const token = generateToken()
      info.token = token
      await info.save()
    }

    res.status(200).json({ message: 'Login Successful', result: info })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Login Failed', error: error })
  }
}
