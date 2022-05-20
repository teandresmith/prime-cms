const bcrypt = require('bcrypt')

export const hashPassword = async (password: string) => {
  const salt = 10
  const hashP = await bcrypt.hash(password, salt)

  return hashP
}

export const verifyPassword = async (
  plainPassword: string,
  hashPassword: string
) => {
  const match = await bcrypt.compare(plainPassword, hashPassword)

  return match
}
