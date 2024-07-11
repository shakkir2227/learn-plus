import { useState } from "react";
import isSignUpFormValid from "../utils/isSignUpFormValid";

export interface IsignupFormData {
    name: string,
    email: string,
    password: string
}

export interface IsignupFormError {
    nameError: string | null
    emailError: string | null
    passwordError: string | null
}

const useSignupFormData = (): {
    signupFormData: IsignupFormData,
    handleChange: ((event: React.ChangeEvent<HTMLInputElement>) => void),
    signupFormError: IsignupFormError,
    setSignupFormError: React.Dispatch<React.SetStateAction<IsignupFormError>>
} => {
    const [signupFormData, setSignupFormData] = useState<IsignupFormData>({
        name: "",
        email: "",
        password: ""
    })
    const [signupFormError, setSignupFormError] =
        useState<IsignupFormError>({ nameError: null, emailError: null, passwordError: null })

    // TODO: Limit calling this function.
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target
        const { nameError, emailError, passwordError } = signupFormError
        if (nameError || emailError || passwordError)
            isSignUpFormValid({ ...signupFormData, [id]: value }, setSignupFormError)

        setSignupFormData({
            ...signupFormData,
            [id]: value
        })
    }
    return { signupFormData, handleChange, signupFormError, setSignupFormError }
}

export default useSignupFormData
