import { Application } from 'express'
import home from './home'
import ecommerceUser from './ecommerce/user'
import ecommerceProduct from './ecommerce/product'
import project from './project/project'
import contentData from './project/contentData'
import contentTypes from './project/contentType'

export const configure = (app: Application) => {
  app.use('', home)
  app.use('/api/ecommerce', ecommerceUser)
  app.use('/api/ecommerce', ecommerceProduct)
  app.use('/api/project', project)
  app.use('/api', contentData)
  app.use('/api', contentTypes)
}
