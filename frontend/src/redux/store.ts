import { configureStore } from '@reduxjs/toolkit'
import cmState from './states/cmState'

export const store = configureStore({
  reducer: { cm: cmState },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
