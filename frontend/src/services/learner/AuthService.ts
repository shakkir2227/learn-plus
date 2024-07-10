import axios from "axios"
import ApiResponse from "../ApiResponse"

const LEARNER_BASE_URL = "/api/v1/learners"

const signUp = async (
    name: string,
    email: string,
    password: string
): Promise<ApiResponse<string>> => {
    return await axios.post(LEARNER_BASE_URL + "/register", { name, email, password })
}


export {
    signUp
}



