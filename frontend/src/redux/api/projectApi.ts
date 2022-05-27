import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const projectAPI = createApi({
  reducerPath: 'projectAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    getProject: builder.mutation({
      query: () => '/api/project',
    }),
    addContentDataInCollection: builder.mutation({
      query: (body) => ({
        url: '/api/project/content-management',
        method: 'POST',
        body: body,
      }),
    }),
    editContentDataInCollection: builder.mutation({
      query: ({ body, itemId }) => ({
        url: `/api/project/content-management/${itemId}`,
        method: 'PATCH',
        body: body,
      }),
    }),
    deleteContentDataInCollection: builder.mutation({
      query: (itemId) => ({
        url: `'/api/project/content-management/${itemId}`,
        method: 'DELETE',
      }),
    }),

    addContentTypeInCollection: builder.mutation({
      query: (body) => ({
        url: '/api/project/content-type',
        method: 'POST',
        body: body,
      }),
    }),
    editContentTypeInCollection: builder.mutation({
      query: ({ body, itemId }) => ({
        url: `/api/project/content-type/${itemId}`,
        method: 'PATCH',
        body: body,
      }),
    }),
    deleteContentTypeInCollection: builder.mutation({
      query: (itemId) => ({
        url: `/api/project/content-type/${itemId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetProjectMutation,
  useAddContentDataInCollectionMutation,
  useAddContentTypeInCollectionMutation,
  useEditContentDataInCollectionMutation,
  useEditContentTypeInCollectionMutation,
  useDeleteContentDataInCollectionMutation,
  useDeleteContentTypeInCollectionMutation,
} = projectAPI
