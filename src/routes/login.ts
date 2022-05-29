import { Router } from 'express'
import { login, register, test } from '../controllers/login'
import { Authorization } from '../middleware/auth'

const signIn = Router()

signIn.post('/login', login)
signIn.post('/register', register)
signIn.get('/test', Authorization, test)

export default signIn
