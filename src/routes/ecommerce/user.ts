import { Router } from 'express'
import { getAllUsers } from '../../controllers/ecommerce/user'
import { Authorization } from '../../middleware/auth'

const ecommerceUser = Router()

ecommerceUser.get('/users', Authorization, getAllUsers)

export default ecommerceUser
