import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const projectContentTypeAPI = createApi({
  reducerPath: 'projectContentTypeAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    getAllCollectionContentTypes: builder.mutation({
      query: ({ projectName, collectionName }) => ({
        url: `/api/${projectName}/${collectionName}/content-type`,
        method: 'GET',
      }),
    }),

    addCollectionContentTypes: builder.mutation({
      query: ({ projectName, collectionName, contentType }) => ({
        url: `/api/${projectName}/${collectionName}/content-type`,
        method: 'POST',
        body: contentType,
      }),
    }),

    getCollectionContentType: builder.mutation({
      query: ({ projectName, collectionName, contentId }) => ({
        url: `/api/${projectName}/${collectionName}/content-type/${contentId}`,
        method: 'GET',
      }),
    }),

    editCollectionContentType: builder.mutation({
      query: ({ projectName, collectionName, contentId, contentType }) => ({
        url: `/api/${projectName}/${collectionName}/content-type/${contentId}`,
        method: 'GET',
        body: contentType,
      }),
    }),

    deleteCollectionContentType: builder.mutation({
      query: ({ projectName, collectionName, contentId }) => ({
        url: `/api/${projectName}/${collectionName}/content-type/${contentId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetAllCollectionContentTypesMutation,
  useAddCollectionContentTypesMutation,
  useGetCollectionContentTypeMutation,
  useEditCollectionContentTypeMutation,
  useDeleteCollectionContentTypeMutation,
} = projectContentTypeAPI
