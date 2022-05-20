import { Application } from 'express'
import home from './home'
import ecommerceUser from './ecommerce/user'
import ecommerceProduct from './ecommerce/product'

export const configure = (app: Application) => {
  app.use('', home)
  app.use('/api/ecommerce', ecommerceUser)
  app.use('/api/ecommerce', ecommerceProduct)
}
