import React, { useState } from 'react'
import Logo from '../../components/shared/Logo'
import { Button } from '../../components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import useLoginForm, { ILoginFormData } from '../../hooks/useLoginForm'
import toast, { Toaster } from 'react-hot-toast'
import ErrorToast from '../../components/shared/ErrorToast'
import isLoginFormValid from '../../utils/isLoginFormValid'
import { loginService } from '../../services/instructor/AuthService'
import { useAppDispatch } from '../../store'
import { login } from '../../store/InstructorSlice'
import { INSTRUCTOR_ROUTE_PATHS } from '../../constants'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'

const Login: React.FC = () => {
    // TOOD(Improve): using thunk remove loading, dispatching
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { loginFormData, handleChange } = useLoginForm()

    const handleSubmit = async (loginFormData: ILoginFormData) => {
        setLoading(true)
        if (!isLoginFormValid(loginFormData)) {
            setLoading(false)
            return toast.custom((t) => (
                <ErrorToast message="Please check your input and try again." t={t}></ErrorToast>
            ))
        }
        const response = await loginService(loginFormData)
        setLoading(false)
        if (!response.success && response.message) {
            return toast.custom((t) => (
                <ErrorToast message={response.message as string} t={t}></ErrorToast>
            ))
        }
        if (response.success) {
            dispatch(login(response.data))
            navigate(INSTRUCTOR_ROUTE_PATHS.root)
        }
    }

    return (
        <div className="bg-customBg md:h-[1000px] h-[1000px] " >
            <Logo user='INSTRUCTOR'/>
            <div className='md:w-1/3 w-3/4 md:h-[480px] h-[500px]  border-gray-500 border-2 rounded-lg mx-auto mt-20'>
                <p className='text-xl font-semibold pt-5 ml-5'>Login </p>
                <p className='text-xs text-gray-400 px-2 pt-2 ml-3' >Unlock the power of teaching excellence. Login now to manage your courses and inspire your students</p>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit(loginFormData)
                }} >
                    <div className="grid gap-4 mt-5 ">
                        <div className="grid gap-2 w-11/12 mx-auto">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                placeholder='ab@example.com'
                                value={loginFormData.email}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className="grid gap-2 w-11/12 mx-auto">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={loginFormData.password}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <Button type="submit" className="w-11/12 mx-auto" disabled={loading}>
                            Login
                        </Button>
                        <p className='text-center  mx-2 sm:text-sm text-xs sm:pt-2'>Don't have an account?? <Link to={INSTRUCTOR_ROUTE_PATHS.signup} className='cursor-pointer underline ' > Sign up </Link></p>

                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    )
}

export default Login
