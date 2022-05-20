import { Schema, Types } from 'mongoose'
import { IUser } from '../../../interfaces/ecommerce/ecommerce.interface'

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    Password: { type: String, required: true },
    userType: { type: String, required: true },
    userId: { type: String, required: true },
    token: { type: String, required: true },
    refreshToken: { type: String, required: true },
    defaultAddress: {
      streetAddress: String,
      city: String,
      statePrefecture: String,
      country: String,
      postalCode: String,
    },
    orders: [
      {
        _id: Types.ObjectId,
        firstName: String,
        lastName: String,
        paymentMethod: String,
        shippingAddress: {
          streetAddress: String,
          city: String,
          statePrefecture: String,
          country: String,
          postalCode: String,
        },
        orderItems: [
          {
            quantity: Number,
            product: {
              _id: Types.ObjectId,
              name: String,
              price: String,
              description: String,
              category: String,
              subcategory: String,
              tag: String,
              image: String,
              language: String,
              brand: String,
              reviews: {
                type: [
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
          },
        ],
      },
    ],
  },
  { collection: 'User' }
)

export default userSchema
