import { configureStore } from '@reduxjs/toolkit'
import cmState from './states/cmState'
import { channelTechAPI } from './api/channelTechApi'
import { projectAPI } from './api/projectApi'

export const store = configureStore({
  reducer: {
    cm: cmState,
    [channelTechAPI.reducerPath]: channelTechAPI.reducer,
    [projectAPI.reducerPath]: projectAPI.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(
      channelTechAPI.middleware,
      projectAPI.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
