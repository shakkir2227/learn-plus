import React from 'react'
import Logo from '../../components/shared/Logo'
import { Button } from '../../components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import useSignupFormData from '../../hooks/useSignupFormData.ts'
import { IsignupFormData } from '../../hooks/useSignupFormData.ts'
import { signUpService } from "../../services/learner/AuthService.ts"
import toast, { Toaster } from 'react-hot-toast';
import isSignUpFormValid from '../../utils/isSignUpFormValid.ts'
import { ROUTE_PATHS } from '../../constants.ts'

const Signup: React.FC = () => {
    const navigate = useNavigate()
    const {
        signupFormData,
        handleChange,
        signupFormError,
        setSignupFormError
    } = useSignupFormData()

    async function handleSubmit(signupFormData: IsignupFormData) {
        if (!isSignUpFormValid(signupFormData, setSignupFormError)) return

        const response = await signUpService(signupFormData)
        if (!response.success) {
            toast.custom(() => (
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg flex max-w-md w-full ring-1 ring-black ring-opacity-5">
                    <div className="flex-1 p-4">
                        <div className="flex items-start">
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">Registration Error</p>
                                <p className="mt-1 text-sm text-gray-500">{response.message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ));
        } else {
            localStorage.setItem("UUI", response.data as string)
            navigate(ROUTE_PATHS.verify)
        }
    }

    return (
        <div className="bg-customBg md:h-[1000px] h-[1500px] ">
            <Logo />
            <div className='text-center mt-16'>
                <span className='md:text-4xl font-serif text-2xl'> Learn something new <br /> with <span className='font-bold'>Learn Plus</span> </span>
            </div>
            <div className='md:w-1/3 w-3/4 md:h-[600px]  border-gray-500 border-2 rounded-lg mx-auto mt-8'>
                <p className='text-center mt-5 font-thin ml-2'>Get Started: Ignite Your Learning Journey </p>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit(signupFormData)
                }} className=' flex flex-col h-full' >
                    <label htmlFor='name' className='md:ml-8 ml-5 mt-3' >Name </label>
                    <p className='md:ml-8 ml-5 text-xs mb-1 text-red-600 '>{signupFormError.nameError} </p>
                    <input className='bg-inputColor  border-gray-400 border-2 rounded-md w-5/6 mx-auto h-9 px-2'
                        type='text'
                        id='name'
                        value={signupFormData.name}
                        onChange={handleChange}
                    />
                    <label htmlFor='email' className='md:ml-8 ml-5 mt-3' >Email </label>
                    <p className='md:ml-8 ml-5 text-xs mb-1 text-red-600'>{signupFormError.emailError} </p>
                    <input className='bg-inputColor  border-gray-400 border-2 rounded-md w-5/6 mx-auto h-9 px-2'
                        type='email'
                        id='email'
                        value={signupFormData.email}
                        onChange={handleChange}
                    />
                    <label htmlFor='password' className='md:ml-8 ml-5 mt-3 '>Password </label>
                    <p className='md:ml-8 ml-5 text-xs mb-1 text-red-600 mr-1'>{signupFormError.passwordError} </p>
                    <input className='bg-inputColor  border-gray-400 border-2 rounded-md w-5/6 mx-auto h-9 px-2'
                        type='password'
                        id='password'
                        value={signupFormData.password}
                        onChange={handleChange}
                    />
                    <Button className='w-5/6 mx-auto mt-5' >Sign up</Button>
                    <p className='text-center my-5'>Already on Learn plus? <Link to={"/login"}> Log in </Link></p>
                </form>
            </div>
            <Toaster />
        </div>
    )
}

export default Signup
