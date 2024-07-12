import { useState } from "react";

export interface ILoginFormData {
    email: string,
    password: string
}

const useLoginForm = (): {
    loginFormData: ILoginFormData,
    handleChange: ((event: React.ChangeEvent<HTMLInputElement>) => void),
} => {
    const [loginFormData, setLoginFormData] = useState<ILoginFormData>({
        email: "",
        password: ""
    })

    // TODO: Limit calling this function.
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target

        setLoginFormData({
            ...loginFormData,
            [id]: value
        })
    }
    return { loginFormData, handleChange }
}

export default useLoginForm
