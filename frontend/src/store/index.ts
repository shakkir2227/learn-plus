import { configureStore } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector, useStore } from 'react-redux'
import LearnerSlice from "./LearnerSlice";
import InstructorSlice from "./InstructorSlice";


const store = configureStore({
    reducer: {
        learner: LearnerSlice.reducer,
        instructor: InstructorSlice.reducer
    }
})


export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore

export default store