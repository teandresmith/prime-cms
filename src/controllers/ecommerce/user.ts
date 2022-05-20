import { Request, Response } from 'express'
import userSchema from '../../database/schemas/ecommerce/user'
import { ecommerceConnection } from '../../database/database'

const User = ecommerceConnection.model('User', userSchema)

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const info = await User.find({})

    if (info?.length !== 0) {
      res.status(200).json({ message: 'Query Successful', result: info })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'There was an error while querying the User Collection',
      error: error,
    })
  }
}
