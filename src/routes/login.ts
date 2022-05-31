import { Router } from 'express'
import { login, register } from '../controllers/login'
import { Authorization } from '../middleware/auth'

const signIn = Router()

signIn.post('/login', login)
signIn.post('/register', register)

export default signIn
