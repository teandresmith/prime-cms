import { Types } from 'mongoose'

export interface IUser {
  _id: Types.ObjectId
  firstName: string
  lastName: string
  email: string
  Password: string
  userType?: string
  userId: string
  token: string
  refreshToken: string
  createdAt: Date
  updatedAt: Date
  defaultAddress: Address
  orders: Types.DocumentArray<IOrder>
}

export interface IProduct {
  _id: Types.ObjectId
  name: string
  price: number
  description: string
  category: string
  subcategory: string
  quantityInStock: number
  productId: string
  tag: string
  image: string
  language: string
  brand: string
  reviews: Types.ArraySubdocument<Review>
  createdAt: Date
  updatedAt: Date
}

export interface IOrder {
  _id: Types.ObjectId
  firstName: string
  lastName: string
  paymentMethod: string
  shippingAddress: Address
  orderItems: Types.DocumentArray<{ quantity: number; product: IProduct }>
}

export type Review = {
  name: string
  rating: number
  comment: string
  reviewId: string
}

export interface Address {
  streetAddress: string
  city: string
  statePrefecture: string
  country: string
  postalCode: string
}
