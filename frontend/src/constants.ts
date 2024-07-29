export enum ROUTE_PATHS {
    learner = "/*",
    instructor = "/instructor/*",
    admin = "/admin/*",
    root = "/",
    signup = "/signup",
    login = "/login",
    verify = "/verify",
    courses = "/courses",
    courseDetails = "/courses/:courseId",
    udpateCourse = "/update-course/:courseId",
    dashboard = "/dashboard",
    account = "/account",
    profile = "/profile",
    addCourse = "/add-course"
}

export enum LEARNER_ROUTE_PATHS {
    root = "/",
    signup = "/signup",
    verify = "/verify",
    login = "/login",
    account = "/account",
    courses = "/courses",
    profile = "/account/profile"

}

export enum INSTRUCTOR_ROUTE_PATHS {
    root = "/instructor",
    signup = "/instructor/signup",
    verify = "/instructor/verify",
    login = "/instructor/login",
    account = "/instructor/account",
    courses = "/instructor/courses",
    addCourse = "/instructor/add-course",
    updateCourse = "/instructor/update-course",
    dashboard = "/instructor/dashboard",
}

export enum ADMIN_ROUTE_PATHS {
    root = "/admin",
    login = "/admin/login",
}

export const LEARNER_BASE_URL = "http://localhost:3000/api/v1/learners"
export const INSTRUCTOR_BASE_URL = "http://localhost:3000/api/v1/instructors"
export const ADMIN_BASE_URL = "http://localhost:3000/api/v1/admin"
export const COURSES_BASE_URL = "http://localhost:3000/api/v1/courses"

export type User = "LEARNER" | "INSTRUCTOR" | "ADMIN"

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

type Language = {
    label: string;
    value: string;
};

export const languages: ReadonlyArray<Language> = [
    { label: "English", value: "English" },
    { label: "French", value: "French" },
    { label: "German", value: "German" },
    { label: "Spanish", value: "Spanish" },
    { label: "Portuguese", value: "Portuguese" },
    { label: "Russian", value: "Russian" },
    { label: "Japanese", value: "Japanese" },
    { label: "Korean", value: "Korean" },
    { label: "Chinese", value: "Chinese" },
    { label: "Arabic", value: "Arabic" },
    { label: "Italian", value: "Italian" },
    { label: "Dutch", value: "Dutch" },
    { label: "Turkish", value: "Turkish" },
    { label: "Swedish", value: "Swedish" },
    { label: "Norwegian", value: "Norwegian" },
    { label: "Danish", value: "Danish" },
    { label: "Finnish", value: "Finnish" },
    { label: "Polish", value: "Polish" },
    { label: "Czech", value: "Czech" },
    { label: "Hungarian", value: "Hungarian" },
    { label: "Greek", value: "Greek" },
    { label: "Hebrew", value: "Hebrew" },
    { label: "Thai", value: "Thai" },
    { label: "Vietnamese", value: "Vietnamese" },
    { label: "Indonesian", value: "Indonesian" },
    { label: "Malay", value: "Malay" },
    { label: "Bengali", value: "Bengali" },
    { label: "Hindi", value: "Hindi" },
    { label: "Telugu", value: "Telugu" },
    { label: "Marathi", value: "Marathi" },
    { label: "Tamil", value: "Tamil" },
    { label: "Urdu", value: "Urdu" },
    { label: "Gujarati", value: "Gujarati" },
    { label: "Malayalam", value: "Malayalam" },
    { label: "Kannada", value: "Kannada" },
    { label: "Punjabi", value: "Punjabi" },
    { label: "Odia", value: "Odia" },
    { label: "Assamese", value: "Assamese" },
    { label: "Sanskrit", value: "Sanskrit" },
    { label: "Nepali", value: "Nepali" },
    { label: "Konkani", value: "Konkani" },
    { label: "Sindhi", value: "Sindhi" },
    { label: "Manipuri", value: "Manipuri" },
    { label: "Bodo", value: "Bodo" },
    { label: "Swahili", value: "Swahili" },
    { label: "Zulu", value: "Zulu" },
    { label: "Xhosa", value: "Xhosa" },
    { label: "Hausa", value: "Hausa" },
    { label: "Amharic", value: "Amharic" },
    { label: "Somali", value: "Somali" },
    { label: "Tigrinya", value: "Tigrinya" },
] as const;


export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export  const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
    const result = sizeInBytes / (1024 * 1024);
    return +result.toFixed(decimalsNum);
};
