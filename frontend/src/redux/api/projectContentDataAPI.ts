import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const projectContentDataAPI = createApi({
  reducerPath: 'projectContentDataAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    getAllCollectionContentData: builder.mutation({
      query: ({ projectName, collectionName }) => ({
        url: `/api/${projectName}/${collectionName}/content-data`,
        method: 'GET',
      }),
    }),

    addCollectionContentData: builder.mutation({
      query: ({ projectName, collectionName, contentData }) => ({
        url: `/api/${projectName}/${collectionName}/content-data`,
        method: 'POST',
        body: contentData,
      }),
    }),
    getCollectionContentData: builder.mutation({
      query: ({ projectName, collectionName, contentId }) => ({
        url: `/api/${projectName}/${collectionName}/content-data/${contentId}`,
        method: 'GET',
      }),
    }),

    editCollectionContentData: builder.mutation({
      query: ({ projectName, collectionName, contentData, contentId }) => ({
        url: `/api/${projectName}/${collectionName}/content-data/${contentId}`,
        method: 'PATCH',
        body: contentData,
      }),
    }),

    deleteCollectionContentData: builder.mutation({
      query: ({ projectName, collectionName, contentId }) => ({
        url: `/api/${projectName}/${collectionName}/content-data/${contentId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetAllCollectionContentDataMutation,
  useAddCollectionContentDataMutation,
  useGetCollectionContentDataMutation,
  useEditCollectionContentDataMutation,
  useDeleteCollectionContentDataMutation,
} = projectContentDataAPI
