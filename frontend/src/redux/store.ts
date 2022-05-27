import { configureStore } from '@reduxjs/toolkit'
import cmState from './states/cmState'
import { channelTechAPI } from './api/channelTechApi'
import { projectAPI } from './api/projectApi'
import { projectContentDataAPI } from './api/projectContentDataAPI'
import { projectContentTypeAPI } from './api/projectContentTypeAPI'

export const store = configureStore({
  reducer: {
    cm: cmState,
    [channelTechAPI.reducerPath]: channelTechAPI.reducer,
    [projectAPI.reducerPath]: projectAPI.reducer,
    [projectContentDataAPI.reducerPath]: projectContentDataAPI.reducer,
    [projectContentTypeAPI.reducerPath]: projectContentTypeAPI.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(
      channelTechAPI.middleware,
      projectAPI.middleware,
      projectContentDataAPI.middleware,
      projectContentTypeAPI.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
