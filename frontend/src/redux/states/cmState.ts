import { createSlice } from '@reduxjs/toolkit'

const project = {
  name: 'channel-tech',
  collections: [
    {
      name: 'Products',
      contentType: [
        {
          type: 'string',
          name: 'firstName',
        },
        {
          type: 'boolean',
          name: 'isPaid',
        },
        {
          type: 'datetime',
          name: 'duration',
        },
      ],
      schema: ['firstName', 'isPaid', 'duration'],
      data: [
        {
          id: 0,
          firstName: 'tim',
          isPaid: false,
          duration: Date.now(),
        },
        { id: 1, firstName: 'thomas', isPaid: false, duration: Date.now() },
        { id: 2, firstName: 'Billy', isPaid: true, duration: Date.now() },
      ],
    },
    {
      name: 'Order',
      contentType: [
        {
          type: 'string',
          name: 'name',
        },
        {
          type: 'boolean',
          name: 'isPaid',
        },
        {
          type: 'number',
          name: 'price',
        },
      ],
      schema: ['name', 'isPaid', 'price'],
      data: [
        {
          id: 100,
          name: 'TeAndre Smith',
          isPaid: false,
          price: 100,
        },
        {
          id: 2103,
          name: 'TeAndre Smith',
          isPaid: true,
          price: 100,
        },
      ],
    },
  ],
}

type CollectionTemp = {
  name?: string
  contentType?: Array<any>
  schema?: Array<string>
  data?: Array<any>
}

type Data = {
  [key: string]: any
}

let collectionData: CollectionTemp = {}
collectionData = JSON.parse(localStorage.getItem('currentCollection') as string)

let currentData: Data = {}

const initialState = {
  contentPage: [],
  project: project,
  projects: ['channel-tech', 'injapan-blog'],
  currentProject: localStorage.getItem('currentProject'),
  currentCollection: collectionData,
  currentData: currentData,
  collectionData: [],
  collectionDetails: {
    schmema: [
      {
        type: 'string',
        name: 'Name',
      },
    ],
  },
}

const cmState = createSlice({
  name: 'cm',
  initialState,
  reducers: {
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload.project
      localStorage.setItem('currentProject', action.payload.project)
    },
    setCurrentCollection: (state, action) => {
      let newInfo = state.project.collections.filter(
        (value) => value.name === action.payload.collection
      )

      state.currentCollection = newInfo.length !== 0 ? newInfo[0] : {}
      localStorage.setItem(
        'currentCollection',
        JSON.stringify(state.currentCollection)
      )
    },
    setCurrentData: (state, action) => {
      state.currentData = action.payload.data
    },
    deleteCollectionEntry: (state, action) => {
      const newInfo = state.currentCollection.data?.filter(
        (value) => value.id !== action.payload.id
      )
      state.currentCollection.data = newInfo
    },
    addCollectionEntry: (state, action) => {
      const newInfo = state.currentCollection.data
      newInfo?.push({
        ...action.payload.data,
        id: Math.round(Math.random() * 100),
      })
      state.currentCollection.data = newInfo
    },
    addContentType: (state, action) => {
      const newInfo = state.currentCollection.contentType

      if (!newInfo?.find((value) => value?.name === action.payload.type?.name))
        newInfo?.push(action.payload.type)
      state.currentCollection.contentType = newInfo
    },
    addCollection: (state, action) => {
      const newInfo = state.project.collections
      if (!newInfo?.find((value) => value?.name === action.payload.collection))
        newInfo.push({
          name: action.payload.collection,
          contentType: [],
          schema: [],
          data: [],
        })

      state.project.collections = newInfo
    },
    addProject: (state, action) => {
      const newInfo = state.projects
      if (!newInfo?.find((value) => value === action.payload.project))
        newInfo.push(action.payload.project)
    },
  },
})

function hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
  return key in obj
}

export const {
  setCurrentProject,
  setCurrentCollection,
  setCurrentData,
  deleteCollectionEntry,
  addCollectionEntry,
  addContentType,
  addCollection,
  addProject,
} = cmState.actions

export default cmState.reducer
