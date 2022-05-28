import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const projectContentDataAPI = createApi({
  reducerPath: 'projectContentDataAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['ContentData', 'Data'],
  endpoints: (builder) => ({
    getAllCollectionContentData: builder.query({
      query: ({ projectName, collectionName }) =>
        `/api/${projectName}/${collectionName}/content-data`,
      providesTags: ['ContentData'],
    }),

    addCollectionContentData: builder.mutation({
      query: ({ projectName, collectionName, contentData }) => ({
        url: `/api/${projectName}/${collectionName}/content-data`,
        method: 'POST',
        body: contentData,
      }),
      invalidatesTags: ['ContentData'],
    }),
    getCollectionContentData: builder.query({
      query: ({ projectName, collectionName, contentId }) =>
        `/api/${projectName}/${collectionName}/content-data/${contentId}`,
      providesTags: ['Data'],
    }),

    editCollectionContentData: builder.mutation({
      query: ({ projectName, collectionName, contentData, contentId }) => ({
        url: `/api/${projectName}/${collectionName}/content-data/${contentId}`,
        method: 'PATCH',
        body: contentData,
      }),
      invalidatesTags: ['Data', 'ContentData'],
    }),

    deleteCollectionContentData: builder.mutation({
      query: ({ projectName, collectionName, contentId }) => ({
        url: `/api/${projectName}/${collectionName}/content-data/${contentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Data', 'ContentData'],
    }),
  }),
})

export const {
  useGetAllCollectionContentDataQuery,
  useAddCollectionContentDataMutation,
  useGetCollectionContentDataQuery,
  useEditCollectionContentDataMutation,
  useDeleteCollectionContentDataMutation,
} = projectContentDataAPI
