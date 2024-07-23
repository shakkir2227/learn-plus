import React, { useState } from 'react'
import Logo from '../../components/shared/Logo'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store'
import useLoginForm, { ILoginFormData } from '../../hooks/useLoginForm'
import isLoginFormValid from '../../utils/isLoginFormValid'
import ErrorToast from '../../components/shared/ErrorToast'
import { login } from '../../store/AdminSlice'
import ErrorToastDark from '../../components/shared/ErrorToastDark'
import { loginService } from '../../services/admin/AuthService'
import { ADMIN_ROUTE_PATHS } from '../../constants'

const Login = () => {

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
                <ErrorToastDark message="Please check your input and try again." t={t}></ErrorToastDark>
            ))
        }
        const response = await loginService(loginFormData)
        setLoading(false)
        if (!response.success && response.message) {
            return toast.custom((t) => (
                <ErrorToastDark message={response.message as string} t={t}></ErrorToastDark>
            ))
        }
        if (response.success) {
            dispatch(login(response.data))
            navigate(ADMIN_ROUTE_PATHS.root)
        }
    }


    return (
        <div className="bg-black md:h-[1000px] h-[1000px] " >
            <Logo theme='BLACK' user='INSTRUCTOR' />
            <div className='md:w-1/3 w-3/4 md:h-[480px] h-[500px]  border-gray-500 border-2 rounded-lg mx-auto mt-20'>
                <p className='text-xl text-white font-semibold pt-5 ml-5'>Login </p>
                <p className='text-xs text-gray-400 px-2 pt-2 ml-3' >Administrative Control Center</p>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit(loginFormData)
                }} >
                    <div className="grid gap-4 mt-5 ">
                        <div className="grid gap-2 w-11/12 mx-auto">
                            <Label className='text-white ' htmlFor="email">Email</Label>
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
                            <Label className='text-white' htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={loginFormData.password}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <Button variant={'outline'} type="submit" className="w-11/12 mx-auto mt-3" disabled={loading} >
                            Login
                        </Button>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    )
}

export default Login
