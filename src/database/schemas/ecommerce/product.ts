import { Schema } from 'mongoose'
import {
  IProduct,
  Review,
} from '../../../interfaces/ecommerce/ecommerce.interface'

const reviewSchema = new Schema<Review>({
  name: String,
  rating: Number,
  comment: String,
  reviewId: String,
})

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    quantityInStock: { type: Number, required: true },
    productId: { type: String, required: true },
    tag: { type: String, required: true },
    image: { type: String, required: true },
    language: { type: String, required: true },
    brand: { type: String, required: true },
    reviews: [reviewSchema],
  },
  { collection: 'Product' }
)

export default productSchema
