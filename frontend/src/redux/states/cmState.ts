import { createSlice } from '@reduxjs/toolkit'

const legacyChannelTech = {
  name: 'channel-tech',
  collections: [
    {
      name: 'Products',
      contentType: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'price',
          type: 'number',
        },
        {
          name: 'image',
          type: 'image',
        },
        {
          name: 'description',
          type: 'textbox',
        },
        {
          name: 'quantityInStock',
          type: 'number',
        },
        {
          name: 'category',
          type: 'text',
        },
        {
          name: 'language',
          type: 'text',
        },
        {
          name: 'subcategory',
          type: 'text',
        },
        {
          name: 'brand',
          type: 'text',
        },
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
  ],
}

const initialState = {
  currentProjectName: localStorage.getItem('currentProject'),
  currentCollection: localStorage.getItem('currentCollection'),
  channelTech: legacyChannelTech,
}

const cmState = createSlice({
  name: 'cm',
  initialState,
  reducers: {
    setCurrentProjectName: (state, action) => {
      localStorage.setItem('currentProject', action.payload.project)
      state.currentProjectName = action.payload.project
    },

    setCurrentCollection: (state, action) => {
      state.currentCollection = action.payload.collection
      localStorage.setItem('currentCollection', action.payload.collection)
    },
  },
})

function hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
  return key in obj
}

export const { setCurrentProjectName, setCurrentCollection } = cmState.actions

export default cmState.reducer
