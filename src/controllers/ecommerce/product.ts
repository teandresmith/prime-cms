import { Response, Request } from 'express'
import axios from 'axios'

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { data } = await axios.get(
      'https://en-jp-tech-ecommerce.an.r.appspot.com/api/products'
    )

    res.json(data)
  } catch (error) {
    res.status(500).json({
      message: 'There was an error while trying to fetch product',
      error: error,
    })
  }
}

export const getProductByID = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productid

    const { data } = await axios.get(
      `https://en-jp-tech-ecommerce.an.r.appspot.com/api/products/${productId}`
    )

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({
      message: 'There was an error while trying to fetch product',
      error: error,
    })
  }
}

export const deleteProductByID = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productid
    const { token } = req.body

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
      message: 'There was an error while trying to fetch product',
      error: error,
    })
  }
}

export const updateProductByID = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productid

    if (productId === '') {
      res.status(400).json({ message: 'There was no product id provided.' })
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
      message: 'There was an error while trying to fetch product',
      error: error,
    })
  }
}
