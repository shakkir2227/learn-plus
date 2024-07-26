import { createSlice } from "@reduxjs/toolkit";

export interface IInstructor {
    _id: string,
    name: string,
    email: string,
    profilePicture: string,
    bio: string
}

export interface IInstructorSlice {
    auth: {
        isLoggedIn: boolean
    },
    instructorDetails: IInstructor | null
}

const initialState: IInstructorSlice = {
    auth: {
        isLoggedIn: false
    },
    instructorDetails: null
}

const InstructorSlice = createSlice({
    name: "InstructorSlice",
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.auth.isLoggedIn = true
            state.instructorDetails = payload
        },
        logout: (state) => {
            state.auth.isLoggedIn = false
            state.instructorDetails = null
        },
        updateProfile: (state, { payload }) => {
            state.instructorDetails = payload.instructor
        },
    }
})

export const { login, logout, updateProfile } = InstructorSlice.actions
export default InstructorSlice