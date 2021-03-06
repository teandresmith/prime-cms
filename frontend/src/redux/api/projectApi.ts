import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

export const projectAPI = createApi({
  reducerPath: 'projectAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).cm.userToken
      headers.set('Authorization', `Bearers ${token}`)
      return headers
    },
  }),
  tagTypes: ['Projects', 'Project'],
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => '/api/project/',
      providesTags: ['Projects'],
    }),

    addProject: builder.mutation({
      query: (project) => ({
        url: '/api/project/',
        method: 'POST',
        body: project,
      }),
      invalidatesTags: ['Projects'],
    }),

    getProject: builder.query({
      query: (projectName) => `/api/project/${projectName}`,
      providesTags: ['Project'],
    }),

    editProject: builder.mutation({
      query: ({ projectName, project }) => ({
        url: `/api/project/${projectName}`,
        method: 'PATCH',
        body: project,
      }),
      invalidatesTags: ['Projects'],
    }),

    deleteProject: builder.mutation({
      query: (projectName) => ({
        url: `/api/project/${projectName}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Projects'],
    }),

    addProjectCollection: builder.mutation({
      query: ({ project, collection }) => ({
        url: `/api/project/${project}/collection`,
        method: 'POST',
        body: collection,
      }),
      invalidatesTags: ['Project'],
    }),

    editProjectCollection: builder.mutation({
      query: ({ project, collection, collectionName }) => ({
        url: `/api/project/${project}/collection/${collectionName}`,
        method: 'PATCH',
        body: collection,
      }),
      invalidatesTags: ['Project'],
    }),

    deleteProjectCollection: builder.mutation({
      query: ({ project, collectionName }) => ({
        url: `/api/project/${project}/collection/${collectionName}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),
  }),
})

export const {
  useGetProjectsQuery,
  useAddProjectMutation,
  useGetProjectQuery,
  useEditProjectMutation,
  useEditProjectCollectionMutation,
  useDeleteProjectCollectionMutation,
  useDeleteProjectMutation,
  useAddProjectCollectionMutation,
} = projectAPI
