export enum ROUTE_PATHS {
    learner = "/*",
    instructor = "/instructor/*",
    root = "/",
    signup = "/signup",
    login = "/login",
    verify = "/verify"
}

export enum LEARNER_ROUTE_PATHS {
    root = "/",
    signup = "/signup",
    verify = "verify",
    login = "/login",

}

export enum INSTRUCTOR_ROUTE_PATHS {
    root = "/instructor",
    signup = "/instructor/signup",
    verify = "/instructor/verify",
    login = "/instructor/login"
}

export const LEARNER_BASE_URL = "http://localhost:3000/api/v1/learners"
export const INSTRUCTOR_BASE_URL = "http://localhost:3000/api/v1/instructors"
