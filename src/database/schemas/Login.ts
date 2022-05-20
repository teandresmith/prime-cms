import { Schema } from 'mongoose'
import { Login } from '../../interfaces/login.interface'

const loginSchema = new Schema<Login>({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  token: String,
})

export default loginSchema
