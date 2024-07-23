import { createSlice } from "@reduxjs/toolkit";

export interface IAdmin {
    _id: string,
    name: string,
    email: string,
}

export interface IAdminSlice {
    auth: {
        isLoggedIn: boolean
    },
    adminDetails?: IAdmin
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
        }
    }
})

export const { login } = AdminSlice.actions
export default AdminSlice