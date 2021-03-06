import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

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
  userToken: Cookies.get('token'),
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
    setUserToken: (state, action) => {
      state.userToken = action.payload.token
    },
  },
})

export const { setCurrentProjectName, setCurrentCollection, setUserToken } =
  cmState.actions

export default cmState.reducer
