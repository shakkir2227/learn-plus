import { ILoginFormData } from "../hooks/useLoginForm";

export default function isLoginFormValid(loginFormData: ILoginFormData) {
    return (
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginFormData.email) &&
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(loginFormData.password)
    )

}