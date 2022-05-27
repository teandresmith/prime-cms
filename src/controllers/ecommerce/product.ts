import { Response, Request } from 'express'
import axios from 'axios'
import { options } from '../statics'

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { data } = await axios.get(
      'https://en-jp-tech-ecommerce.an.r.appspot.com/api/products'
    )

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({
      message: options.QUERY_ERROR,
      error: error,
    })
  }
}

export const getProductByID = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productid

    if (productId === '') {
      res.status(400).json({ message: options.EMPTY_PARAM })
    }

    const { data } = await axios.get(
      `https://en-jp-tech-ecommerce.an.r.appspot.com/api/products/${productId}`
    )

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({
      message: options.QUERY_ERROR,
      error: error,
    })
  }
}

export const getProductByPage = async (req: Request, res: Response) => {}

export const deleteProductByID = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productid
    const { token } = req.body

    if (productId === '') {
      res.status(400).json({ message: options.EMPTY_PARAM })
    }

    const { data } = await axios.delete(
      `https://en-jp-tech-ecommerce.an.r.appspot.com/api/products/${productId}`,
      {
        headers: {
          Token: token,
        },
      }
    )

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({
      message: options.DELETE_ERROR,
      error: error,
    })
  }
}

export const updateProductByID = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productid

    if (productId === '') {
      res.status(400).json({ message: options.EMPTY_PARAM })
    }

    const { token } = req.body

    const { data } = await axios.patch(
      `https://en-jp-tech-ecommerce.an.r.appspot.com/api/products/${productId}`,
      req.body,
      {
        headers: {
          'Content-Type': 'application/json',
          Token: token,
        },
      }
    )

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({
      message: options.UPDATE_ERROR,
      error: error,
    })
  }
}
