import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const projectContentTypeAPI = createApi({
  reducerPath: 'projectContentTypeAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['ContentType'],
  endpoints: (builder) => ({
    getAllCollectionContentTypes: builder.query({
      query: ({ projectName, collectionName }) =>
        `/api/${projectName}/${collectionName}/content-type`,
      providesTags: ['ContentType'],
    }),

    addCollectionContentTypes: builder.mutation({
      query: ({ projectName, collectionName, contentType }) => ({
        url: `/api/${projectName}/${collectionName}/content-type`,
        method: 'POST',
        body: contentType,
      }),
      invalidatesTags: ['ContentType'],
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
      invalidatesTags: ['ContentType'],
    }),

    deleteCollectionContentType: builder.mutation({
      query: ({ projectName, collectionName, contentId }) => ({
        url: `/api/${projectName}/${collectionName}/content-type/${contentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ContentType'],
    }),
  }),
})

export const {
  useGetAllCollectionContentTypesQuery,
  useAddCollectionContentTypesMutation,
  useGetCollectionContentTypeMutation,
  useEditCollectionContentTypeMutation,
  useDeleteCollectionContentTypeMutation,
} = projectContentTypeAPI
