import { Schema, Types } from 'mongoose'
import { IOrder } from '../../../interfaces/ecommerce/ecommerce.interface'

const orderSchema = new Schema<IOrder>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  shippingAddress: {
    type: {
      streetAddress: String,
      city: String,
      statePrefecture: String,
      country: String,
      postalCode: String,
    },
    required: true,
  },
  orderItems: {
    type: [
      {
        quantity: Number,
        product: {
          _id: Types.ObjectId,
          name: String,
          price: Number,
          description: String,
          category: String,
          tag: String,
          image: String,
          language: String,
          brand: String,
          reviews: [
            {
              _id: Types.ObjectId,
              name: String,
              rating: Number,
              comment: String,
              reviewId: String,
              createdAt: Date,
              updatedAt: Date,
            },
          ],
        },
      },
    ],
    required: true,
  },
})

export default orderSchema
