import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const projectAPI = createApi({
  reducerPath: 'projectAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    getProjects: builder.mutation({
      query: () => '/api/project/',
    }),

    addProjects: builder.mutation({
      query: (project) => ({
        url: '/api/projects/',
        method: 'POST',
        body: project,
      }),
    }),

    getProject: builder.mutation({
      query: (projectName) => ({
        url: `/api/projects/${projectName}`,
        method: 'GET',
      }),
    }),

    editProjects: builder.mutation({
      query: ({ projectName, project }) => ({
        url: `/api/projects/${projectName}`,
        method: 'PATCH',
        body: project,
      }),
    }),

    deleteProjects: builder.mutation({
      query: (projectName) => ({
        url: `/api/projects/${projectName}`,
        method: 'DELETE',
      }),
    }),

    addProjectCollection: builder.mutation({
      query: ({ project, collection }) => ({
        url: `/api/${project}/collection`,
        method: 'POST',
        body: collection,
      }),
    }),

    editProjectCollection: builder.mutation({
      query: ({ project, collection, collectionName }) => ({
        url: `/api/${project}/collection/${collectionName}`,
        method: 'PATCH',
        body: collection,
      }),
    }),

    deleteProjectCollection: builder.mutation({
      query: ({ project, collectionName }) => ({
        url: `/api/${project}/collection/${collectionName}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetProjectsMutation,
  useAddProjectsMutation,
  useGetProjectMutation,
  useEditProjectsMutation,
  useEditProjectCollectionMutation,
  useDeleteProjectCollectionMutation,
  useDeleteProjectsMutation,
  useAddProjectCollectionMutation,
} = projectAPI
