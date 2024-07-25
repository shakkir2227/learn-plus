import { createSlice } from "@reduxjs/toolkit";

export interface IAdmin {
    _id: string,
    name: string,
    email: string,
}

export interface IUser {
    _id: string,
    name: string,
    email: string,
    isBlocked: boolean,

}

export interface IAdminSlice {
    auth: {
        isLoggedIn: boolean
    },
    adminDetails?: IAdmin
    allLearners?: IUser[]
    allInstructors?: IUser[]
}

const initialState: IAdminSlice = {
    auth: {
        isLoggedIn: false
    },
}

const AdminSlice = createSlice({
    name: "AdminSlice",
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.auth.isLoggedIn = true
            state.adminDetails = payload
        },
        loadLearners: (state, { payload }) => {
            state.allLearners = payload
        },
        loadInstructors: (state, { payload }) => {
            state.allInstructors = payload
        },
        updateLearners: (state, { payload }) => {
            state.allLearners = state.allLearners?.map((learner) => {
                if (learner._id !== payload._id) return learner
                return payload
            })
        },
        updateInstructors: (state, { payload }) => {
            state.allInstructors = state.allInstructors?.map((instructor) => {
                if (instructor._id !== payload._id) return instructor
                return payload
            })
        }
    }
})

export const { login, loadLearners, loadInstructors, updateLearners, updateInstructors } = AdminSlice.actions
export default AdminSlice