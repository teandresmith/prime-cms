import { createSlice } from '@reduxjs/toolkit'
import { Project, ProjectResponse } from '../Types'

type CollectionTemp = {
  name?: string
  contentType?: Array<any>
  schema?: Array<string>
  data?: Array<any>
}

type Data = {
  [key: string]: any
}

let currentData: Data = {}

let project: ProjectResponse | undefined

const initialState = {
  project: project,
  currentProjectName: localStorage.getItem('currentProject'),
  currentCollection: localStorage.getItem('currentCollection'),
  currentData: currentData,
  collectionData: [],
}

const cmState = createSlice({
  name: 'cm',
  initialState,
  reducers: {
    setCurrentProjectName: (state, action) => {
      localStorage.setItem('currentProject', action.payload.project)
      state.currentProjectName = action.payload.project
    },
    setProject: (state, action) => {
      const project = action.payload

      state.project = project
    },
    setCurrentCollection: (state, action) => {
      state.currentCollection = action.payload.collection
      localStorage.setItem('currentCollection', action.payload.collection)
    },
    setCurrentData: (state, action) => {
      state.currentData = action.payload.data
    },
  },
})

function hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
  return key in obj
}

export const {
  setCurrentProjectName,
  setProject,
  setCurrentCollection,
  setCurrentData,
} = cmState.actions

export default cmState.reducer
