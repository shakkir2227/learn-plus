import { createSlice } from "@reduxjs/toolkit";

export interface ILearnerSlice {
    auth: {
        isLoggedIn: boolean
    },
    learnerDetails?: {
        _id: string,
        name: string,
        email: string,
        coursesEnrolled: Array<unknown>
    }
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
        }
    }
})

export const { login } = LearnerSlice.actions
export default LearnerSlice