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
    learnerDetails?: ILearner
}

const initialState: ILearnerSlice = {
    auth: {
        isLoggedIn: false
    },
}

const LearnerSlice = createSlice({
    name: "learnerSlice",
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.auth.isLoggedIn = true
            state.learnerDetails = payload
        },
        updateProfile: (state, { payload }) => {
            state.learnerDetails = payload.learner
        },
    }
})

export const { login, updateProfile } = LearnerSlice.actions
export default LearnerSlice