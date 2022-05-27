import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const channelTechAPI = createApi({
  reducerPath: 'channelTechAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://en-jp-tech-ecommerce.an.r.appspot.com',
  }),
  endpoints: (builder) => ({
    getProject: builder.mutation({
      query: () => '/api/products',
    }),
    getProductsByPage: builder.mutation({
      query: ({ page, numberPerPage }) => ({
        url: `'/api/product/query?page=${page}&numberPerPage=${numberPerPage}`,
        method: 'GET',
      }),
    }),
    getProductByID: builder.mutation({
      query: (productid) => ({
        url: `/api/products/${productid}`,
        method: 'GET',
      }),
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: '/api/admin/products',
        method: 'POST',
        body: product,
      }),
    }),
    editProduct: builder.mutation({
      query: ({ product, productid }) => ({
        url: `/api/admin/products/${productid}`,
        method: 'PATCH',
        body: product,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productid) => ({
        url: `/api/admin/products/${productid}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetProjectMutation,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useGetProductByIDMutation,
  useGetProductsByPageMutation,
} = channelTechAPI
