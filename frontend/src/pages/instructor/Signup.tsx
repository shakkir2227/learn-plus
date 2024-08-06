import React, { useState } from 'react'
import Logo from '../../components/shared/Logo'
import { Button } from '../../components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import useSignupForm from '../../hooks/useSignupForm.ts'
import { IsignupFormData } from '../../hooks/useSignupForm.ts'
import toast, { Toaster } from 'react-hot-toast';
import isSignUpFormValid from '../../utils/isSignUpFormValid.ts'
import { INSTRUCTOR_ROUTE_PATHS } from '../../constants.ts'
import ErrorToast from '../../components/shared/ErrorToast.tsx'
import { Input } from '../../components/ui/input.tsx'
import { Label } from '@radix-ui/react-label'
import { signUpService } from '../../services/instructor/AuthService.ts'

const Signup: React.FC = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const {
        signupFormData,
        handleChange,
        signupFormError,
        setSignupFormError
    } = useSignupForm()

    async function handleSubmit(signupFormData: IsignupFormData) {
        setLoading(true)
        if (!isSignUpFormValid(signupFormData, setSignupFormError)) {
            setLoading(false)
            return
        }

        const response = await signUpService(signupFormData)
        setLoading(false)
        if (!response.success && response.message) {
            return toast.custom((t) => (
                <ErrorToast message={response.message as string} t={t}></ErrorToast>
            ))
        }
        if (response.success) {
            localStorage.setItem("UII", response.data as string)
            localStorage.setItem("timer", "60")
            navigate(INSTRUCTOR_ROUTE_PATHS.verify)
        }
    }

    // TODO: create a spinner while loading
    return (
        <div className="bg-customBg md:h-[1000px] h-[1100px] ">
            <Logo user='INSTRUCTOR' />
            <div className='md:w-1/3 p-3 w-3/4 md:h-[700px]  mt-16  border-gray-500 border-2  rounded-lg mx-auto '>
                <p className='text-xl font-semibold pt-5 ml-5'>Signup </p>
                <p className='text-xs ml-5 pt-3 text-gray-400'>Ready to share your knowledge and inspire the next generation? Sign up as an instructor today!</p>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit(signupFormData)
                }} >
                    <div className="grid gap-4 mt-5 ">
                        <div className="grid  w-11/12 mx-auto">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                value={signupFormData.name}
                                onChange={handleChange}
                            />
                            <p className='text-xs  text-red-600  mt-1'>{signupFormError.nameError} </p>
                        </div>
                        <div className="grid w-11/12 mx-auto">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                value={signupFormData.email}
                                onChange={handleChange}
                            />
                            <p className='md:ml-8 ml-5 text-xs text-red-600 mt-1'>{signupFormError.emailError} </p>
                        </div>
                        <div className="grid w-11/12 mx-auto">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={signupFormData.password}
                                onChange={handleChange} />
                            <p className='text-xs  text-red-600 mr-1 mt-1'>{signupFormError.passwordError} </p>
                        </div>
                        <Button type="submit" className="w-11/12 mx-auto" disabled={loading}>
                            Sign up
                        </Button>
                    </div>
                    <p className='text-center my-5 text-sm '>Already on Learn plus? <Link to={INSTRUCTOR_ROUTE_PATHS.login} className='cursor-pointer underline '> Log in </Link></p>
                </form>
            </div>
            <Toaster />
        </div>
    )
}

export default Signup



