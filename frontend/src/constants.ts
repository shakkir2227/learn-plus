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
    verify = "/verify",
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

export type User =  "LEARNER" | "INSTRUCTOR"

export const INSTRUCTOR_FAQ = [
    {
        id: 1,
        isOpen: false,
        heading: "What kind of instructors does Learn Plus look for?",
        content: " No specific certification or teaching experience is required! We welcome instructors who:  Enjoy sharing knowledge and making a difference in students lives   Have outstanding communication skills Are willing to provide a personalized learning experience to students"
    },
    {
        id: 2,
        isOpen: false,
        heading: "What kind of subjects can i teach in Learn Plus?",
        content: "We have cover many subjects on Learn Plus, including languages, school and university subjects, hobbies and art"
    },
    {
        id: 3,
        isOpen: false,
        heading: "How do I become an instructor at Learn Plus?",
        content: "Sign up for an account, That's it. Now you can start creating and uploading your courses on the platform. Make sure to follow any guidelines provided by Learn Plus regarding course content, format, and pricing."
    },
    {
        id: 4,
        isOpen: false,
        heading: "Is it free to create a instructor profile on Learn Plus?",
        content: "Yes. It is free to create a Learn Plus instructor profile, get exposure to students, and use our tools and materials."
    },
    {
        id: 5,
        isOpen: false,
        heading: "What computer equipment do i need to teach?",
        content: "You will need a laptop or a desktop computer, a stable internet connection, a webcam, and a microphone for creating a lesson."
    },
]
