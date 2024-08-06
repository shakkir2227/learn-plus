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

interface ICourse {
    _id: string,
    name: string,
    instructorName: string,
    isBlocked: boolean
}

interface ISubject {
    _id: string,
    name: string,
    isBlocked: boolean
}


export interface IAdminSlice {
    auth: {
        isLoggedIn: boolean
    },
    adminDetails: IAdmin | null
    allLearners?: IUser[]
    allInstructors?: IUser[]
    allCourses?: ICourse[]
    allSubjects?: ISubject[]
}

const initialState: IAdminSlice = {
    auth: {
        isLoggedIn: false
    },
    adminDetails: null
}

const AdminSlice = createSlice({
    name: "AdminSlice",
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.auth.isLoggedIn = true
            state.adminDetails = payload
        },
        logout: (state) => {
            state.auth.isLoggedIn = false
            state.adminDetails = null
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
        },
        loadCourses: (state, { payload }) => {
            state.allCourses = payload
        },
        loadSubjects: (state, { payload }) => {
            state.allSubjects = payload
        },
        updateCourse: (state, { payload }) => {
            state.allCourses = state.allCourses?.map((course) => {
                if (course._id !== payload._id) return course
                return { ...course, isBlocked: payload.isBlocked }
            })
        }
    }
})

export const {
    login,
    logout,
    loadLearners,
    loadInstructors,
    updateLearners,
    updateInstructors,
    loadCourses,
    loadSubjects,
    updateCourse
} = AdminSlice.actions
export default AdminSlice