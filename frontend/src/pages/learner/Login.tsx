import React, { useState } from 'react'
import Logo from '../../components/shared/Logo'
import { Button } from '../../components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import useLoginForm, { ILoginFormData } from '../../hooks/useLoginForm'
import toast, { Toaster } from 'react-hot-toast'
import ErrorToast from '../../components/shared/ErrorToast'
import isLoginFormValid from '../../utils/isLoginFormValid'
import { loginService } from '../../services/learner/AuthService'
import { useAppDispatch } from '../../store'
import { login } from '../../store/LearnerSlice'
import { LEARNER_ROUTE_PATHS, ROUTE_PATHS } from '../../constants'

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
            navigate(LEARNER_ROUTE_PATHS.root)
        }
    }

    return (
        <div className="bg-customBg md:h-[1000px] h-[1300px] " >
            <Logo />
            <div className='text-center mt-16'>
                <span className='md:text-4xl font-serif text-2xl'> Unlock Your Potential <br /> Log In to <span className='font-bold'>Learn Plus</span> </span>
            </div>
            <div className='md:w-1/3 w-3/4 md:h-[430px]  border-gray-500 border-2 rounded-lg mx-auto mt-8'>
                <p className='text-center mt-5 font-thin ml-2'>Ready to dive in? Let's get you started!  </p>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit(loginFormData)
                }} className=' flex flex-col h-full'>
                    <label htmlFor='email' className='md:ml-8 ml-5 mt-3' >Email </label>
                    <input className='bg-inputColor  border-gray-400 border-2 rounded-md w-5/6 mx-auto h-9 px-2'
                        type='email'
                        id='email'
                        value={loginFormData.email}
                        onChange={(e) => handleChange(e)}
                    />
                    <label htmlFor='password' className='md:ml-8 ml-5 mt-3'>Password </label>
                    <input className='bg-inputColor  border-gray-400 border-2 rounded-md w-5/6 mx-auto h-9 px-2'
                        type='password'
                        id='password'
                        value={loginFormData.password}
                        onChange={(e) => handleChange(e)}
                    />
                    <Button className='w-5/6 mx-auto mt-5' disabled={loading} >Log in</Button>
                    <p className='text-center my-5 mx-2 text-sm'>Don't have an account?? <Link to={"/signup"} className='cursor-pointer underline ' > Sign up </Link></p>
                </form>
            </div>
            <Toaster />
        </div>
    )
}

export default Login
