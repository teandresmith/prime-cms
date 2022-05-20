import { createConnection } from 'mongoose'
import loginSchema from '../database/schemas/Login'
import dotenv from 'dotenv'

dotenv.config()

export const ecommerceConnection = createConnection(
  process.env.ECOMM_DB_URI as string
)

export const blogConnection = createConnection(
  process.env.BLOG_DB_URI as string
)

export const cmsConnection = createConnection(process.env.CMS_DB_URI as string)
export const LoginModel = cmsConnection.model('User', loginSchema)
