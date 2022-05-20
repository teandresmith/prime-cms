import { Router } from 'express'

import {
  getAllProducts,
  getProductByID,
  deleteProductByID,
  updateProductByID,
} from '../../controllers/ecommerce/product'

const ecommerceProduct = Router()

ecommerceProduct.get('/products', getAllProducts)

ecommerceProduct
  .route('/products/:productid')
  .get(getProductByID)
  .delete(deleteProductByID)
  .patch(updateProductByID)

export default ecommerceProduct
