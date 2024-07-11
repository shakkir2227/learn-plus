import React, { useEffect, useState } from 'react'
import Logo from '../../components/shared/Logo'
import { Button } from '../../components/ui/button'
import toast, { Toaster } from 'react-hot-toast'
import { verifyEmailService } from '../../services/learner/AuthService'
import ErrorToast from '../../components/shared/ErrorToast'
import { useAppDispatch } from '../../store'
import { login } from '../../store/LearnerSlice'
import { useNavigate } from 'react-router'
import { ROUTE_PATHS } from '../../constants'

const Verify: React.FC = () => {
    const [OTP, setOTP] = useState<string>()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    async function handleSubmit() {
        const learnerId = localStorage.getItem("UUI")
        // TODO: Give toast msg here. 
        if (!OTP?.trim() || !learnerId) return

        const response = await verifyEmailService(OTP, learnerId)
        if (!response.success && response.message) {
            toast.custom((t) => (
                <ErrorToast message={response.message as string} t={t}></ErrorToast>
            ))
        }
        if (response.success) {
            dispatch(login(response.data))
            localStorage.removeItem("UUI")
            navigate(ROUTE_PATHS.learner)
        }
    }

    return (
        <div className="bg-customBg md:h-[1000px] h-[1500px] ">
            <Logo />
            <div className='text-center mt-16 md:w-1/3 mx-auto px-1' >
                <span className='md:text-sm text-xs text-green-600 font-normal  '>Thank you for signing up! A verification email has been sent to your email address. Please enter the OTP (One-Time Password) here to verify your account </span>
            </div>
            <div className='md:w-1/3 w-3/4 md:h-80  border-gray-500 border-2 rounded-lg mx-auto mt-8'>
                <p className='text-center mt-5 font-thin ml-2'>You're one step away from unlocking amazing learning opportunities! </p>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()

                }} className=' flex flex-col h-full' >
                    <label htmlFor='name' className='md:ml-8 ml-5 mt-3'>Verification Code</label>
                    <p className='md:ml-8 ml-5 text-xs mb-1 text-red-600 '> </p>
                    <input className='bg-inputColor  border-gray-400 border-2 rounded-md w-5/6 mx-auto h-9 px-2'
                        type='text'
                        id='name'
                        value={OTP}
                        onChange={(e) => { setOTP(e.target.value) }}
                    />
                    <Button className='w-5/6 mx-auto mt-5' >Verify Email</Button>
                    <p className='text-center my-5 text-sm mx-2'>Didn't receive the verification email? <span className='cursor-pointer underline'> Resend </span></p>
                </form>
            </div>
            <Toaster />
        </div>
    )
}

export default Verify
