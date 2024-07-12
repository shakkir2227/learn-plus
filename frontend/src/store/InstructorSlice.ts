import { createSlice } from "@reduxjs/toolkit";

export interface IInstructor {
    _id: string,
    name: string,
    email: string,
}

export interface IInstructorSlice {
    auth: {
        isLoggedIn: boolean
    },
    instructorDetails?: IInstructor
}

const initialState: IInstructorSlice = {
    auth: {
        isLoggedIn: false
    },
}

const InstructorSlice = createSlice({
    name: "InstructorSlice",
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.auth.isLoggedIn = true
            state.instructorDetails = payload
        }
    }
})

export const { login } = InstructorSlice.actions
export default InstructorSlice