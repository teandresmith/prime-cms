import { Request, Response } from 'express'
import { generateToken } from '../helpers/token'
import { Login } from '../interfaces/login.interface'
import { LoginModel } from '../database/database'
import { hashPassword, verifyPassword } from '../helpers/password'
import { options } from './statics'

export const login = async (req: Request, res: Response) => {
  const user: Login = {
    email: req?.body?.email,
    password: req?.body?.password,
  }

  if (user.email === undefined || user.password === undefined) {
    res.status(400).json({ message: 'Did not provide email or password' })
    return
  }

  try {
    const info = await LoginModel.findOne({ email: user.email })

    if (!info) {
      res.status(500).json({ message: 'Login failed' })
      return
    }

    const match = await verifyPassword(user.password, info.password)

    if (match) {
      const token = await generateToken()
      info.token = token
      await info.save()
    } else {
      res.status(401).json({ message: 'Incorrect email or password' })
      return
    }

    res.status(200).json({ message: 'Login Successful', result: info })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Login Failed', error: error })
  }
}

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ message: options.MISSING_BODY })
  }

  try {
    const hashPass = await hashPassword(password)

    const newUser: Login = {
      email: email,
      password: hashPass,
    }

    await LoginModel.create(newUser)

    res.status(200).json({ message: 'Register Successful' })
  } catch (error) {
    res.status(500).json({ message: 'Register Failed', error: error })
  }
}

export const test = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'hello' })
}
