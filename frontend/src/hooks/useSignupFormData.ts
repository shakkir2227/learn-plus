import { useState } from "react";

type signupFormData = {
    name: string,
    email: string,
    password: string
}

const useSignupFormData = (): {
    signupFormData: signupFormData,
    handleChange: ((event: React.ChangeEvent<HTMLInputElement>) => void)
} => {

    const [signupFormData, setSignupFormData] = useState<signupFormData>({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target

        setSignupFormData({
            ...signupFormData,
            [id]: value
        })
    } 

    return { signupFormData, handleChange }

}

export default useSignupFormData
