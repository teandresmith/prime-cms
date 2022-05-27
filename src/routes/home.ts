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
    ProjectEndpoints: {
      Project: [
        '/api/project',
        '/api/project/:project',
        '/api/project/:project/collection',
        '/api/project/:project/collection/:name',
      ],
      ProjectContentData: [
        '/api/:project/:collection/content-data',
        '/api/:project/:collection/content-data/contentId',
      ],
      ProjectContentType: [
        '/api/:project/:collection/content-type',
        '/api/:project/:collection/content-type/:contentId',
      ],
    },
  }
  res.status(200).json(endpoints)
})

export default home
