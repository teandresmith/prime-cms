import { Router, Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const home: Router = Router()

home.get('/', (req: Request, res: Response) => {
  const intro = {
    Welcome: 'Welcome to the Personal CMS System',
  }
  res.status(200).json(intro)
})

home.get('/api', (req: Request, res: Response) => {
  const endpoints = {
    DirectoryEndpoints: ['/', '/api'],
    EcommerceEndPoints: [
      '/api/ecommerce/users',
      '/api/ecommerce/products',
      '/api/ecommerce/products/:productsid',
    ],
  }
  res.status(200).json(endpoints)
})

export default home
