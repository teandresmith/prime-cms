const jwt = require('jsonwebtoken')

export const generateToken = () => {
  const token = jwt.sign({}, process.env.TOKEN_SECRET, { expiresIn: 60 * 30 })
  return token
}

export const verifyToken = (token: string) => {
  try {
    jwt.verify(token, process.env.TOKEN_SECRET)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
