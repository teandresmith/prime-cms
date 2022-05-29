const jwt = require('jsonwebtoken')
import dotenv from 'dotenv'

dotenv.config()

export const generateToken = async () => {
  const token = await jwt.sign({}, process.env.TOKEN_SECRET, {
    expiresIn: 60 * 30,
  })
  return token
}

export const verifyToken = async (token: string) => {
  try {
    await jwt.verify(token, process.env.TOKEN_SECRET)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
