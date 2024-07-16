import { IsignupFormData } from "../hooks/useSignupForm";
import { IsignupFormError } from "../hooks/useSignupForm";

export default function isSignUpFormValid
    (
        signupFormData: IsignupFormData,
        setSignupFormError: React.Dispatch<React.SetStateAction<IsignupFormError>>
    ): boolean {

    let signupFormErrorCopy: IsignupFormError = { nameError: null, emailError: null, passwordError: null }

    const { name, email, password } = signupFormData
    if (!/^[A-Za-z][A-Za-z\s]{1,28}$/.test(name)) {
        signupFormErrorCopy = { ...signupFormErrorCopy, ["nameError"]: "Name should only include alphabetic characters" }
    }
    if (!/^\S+@[^\s@]+\.[^\s@]+$/.test(email)) {
        signupFormErrorCopy = { ...signupFormErrorCopy, ["emailError"]: "Please enter a valid email address." }

    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
        signupFormErrorCopy = { ...signupFormErrorCopy, ["passwordError"]: "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be between 8 and 30 characters long." }
    }

    setSignupFormError({ ...signupFormErrorCopy })

    const { nameError, emailError, passwordError } = signupFormErrorCopy
    if (nameError || emailError || passwordError) return false
    return true

}   