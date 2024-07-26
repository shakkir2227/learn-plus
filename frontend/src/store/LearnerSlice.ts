import { createSlice } from "@reduxjs/toolkit";

export interface ILearner {
    _id: string,
    name: string,
    email: string,
    coursesEnrolled: Array<unknown>
}

export interface ILearnerSlice {
    auth: {
        isLoggedIn: boolean
    },
    learnerDetails: ILearner | null
}

const initialState: ILearnerSlice = {
    auth: {
        isLoggedIn: false
    },
    learnerDetails: null
}

const LearnerSlice = createSlice({
    name: "learnerSlice",
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.auth.isLoggedIn = true
            state.learnerDetails = payload
        },
        logout: (state) => {
            state.auth.isLoggedIn = false
            state.learnerDetails = null
        },
        updateProfile: (state, { payload }) => {
            state.learnerDetails = payload.learner
        },
    }
})

export const { login, logout, updateProfile } = LearnerSlice.actions
export default LearnerSlice