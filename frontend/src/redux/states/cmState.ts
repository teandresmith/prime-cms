import { createSlice } from '@reduxjs/toolkit'

const fakeData: any = {
  channeltech: [
    { id: 1, name: 'Products', createdAt: 'May 1 2022' },
    { id: 2, name: 'Users', createdAt: 'May 1 2022' },
    { id: 3, name: 'Orders', createdAt: 'May 1 2022' },
    { id: 4, name: 'Reviews', createdAt: 'May 1 2022' },
  ],
  injapanblog: [
    { id: 1, name: 'Products', createdAt: 'May 1 2022' },
    { id: 2, name: 'Users', createdAt: 'May 1 2022' },
    { id: 3, name: 'Orders', createdAt: 'May 1 2022' },
  ],
}

const fakeData1: any = {
  Products: [
    {
      id: 1,
      name: 'Product Item',
      createdAt: 'Some time',
    },
    {
      id: 2,
      name: 'Product Item',
      createdAt: 'Some time',
    },
  ],
  Users: [
    {
      id: 1,
      name: 'UUProduct Item',
      createdAt: 'Some time',
    },
    {
      id: 2,
      name: 'UUProduct Item',
      createdAt: 'Some time',
    },
  ],
  Reviews: [
    {
      id: 1,
      name: 'RRProduct Item',
      createdAt: 'Some time',
    },
    {
      id: 2,
      name: 'RRProduct Item',
      createdAt: 'Some time',
    },
  ],
  Orders: [
    {
      id: 1,
      name: 'Order Item',
      createdAt: 'Some time',
    },
    {
      id: 2,
      name: 'Order Item',
      createdAt: 'Some time',
    },
  ],
}

const schemas = {
  // each collection => Stored Schema in DB
  // Products =
}

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
        { id: 1, firstName: 'thomas', isPaid: true, duration: Date.now() },
        { id: 2, firstName: 'thomas', isPaid: true, duration: Date.now() },
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
          isPaid: false,
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

let currentData: Data = {}

const initialState = {
  contentPage: [],
  project: project,
  projects: ['channel-tech', 'injapan-blog'],
  currentProject: localStorage.getItem('currentProject'),
  currentCollection: collectionData,
  currentData: currentData,
  collectionData: [],
  collections: fakeData['channeltech'],
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
    addCollection: (state, action) => {
      var newInfo = state.collections

      newInfo.push({ collectionName: action.payload.collection })

      state.collections = newInfo
    },
    deleteCollection: (state, action) => {
      var newInfo = state.collections
      newInfo = newInfo.filter(
        (value: any) => value?.collectionName !== action.payload.collection
      )
      state.collections = newInfo
    },
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload.project
      localStorage.setItem('currentProject', action.payload.project)
    },
    setCurrentCollection: (state, action) => {
      let newInfo = state.project.collections.filter(
        (value) => value.name === action.payload.collection
      )

      state.currentCollection = newInfo.length !== 0 ? newInfo[0] : {}
    },
    setCollections: (state, action) => {
      if (hasKey(fakeData, action.payload.collection))
        state.collections = fakeData[action.payload.collection]
    },
    setCollectionData: (state, action) => {
      if (hasKey(fakeData1, action.payload.collection))
        state.collectionData = fakeData1[action.payload.collection]
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
  addCollection,
  deleteCollection,
  setCurrentProject,
  setCurrentCollection,
  setCollections,
  setCollectionData,
  setCurrentData,
} = cmState.actions

export default cmState.reducer
