import React, { useEffect, useState } from 'react'
import Logo from '../../components/shared/Logo'
import { Button } from '../../components/ui/button'
import toast, { Toaster } from 'react-hot-toast'
import { verifyEmailService } from '../../services/instructor/AuthService'
import ErrorToast from '../../components/shared/ErrorToast'
import { useAppDispatch } from '../../store'
import { login } from '../../store/InstructorSlice'
import { useNavigate } from 'react-router'
import { INSTRUCTOR_ROUTE_PATHS } from '../../constants'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'

const Verify: React.FC = () => {
    const [OTP, setOTP] = useState<string>()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    async function handleSubmit() {
        const instructorId = localStorage.getItem("UII")
        // TODO: Give toast msg here. 
        if (!OTP?.trim() || !instructorId) return

        const response = await verifyEmailService(OTP, instructorId)
        if (!response.success && response.message) {
            toast.custom((t) => (
                <ErrorToast message={response.message as string} t={t}></ErrorToast>
            ))
        }
        if (response.success) {
            dispatch(login(response.data))
            localStorage.removeItem("UII")
            navigate(INSTRUCTOR_ROUTE_PATHS.root)
        }
    }

    useEffect(() => {
        if (!localStorage.getItem("UII")) navigate(INSTRUCTOR_ROUTE_PATHS.signup)
    })

    return (
        <div className="bg-customBg md:h-[1000px] h-[1500px] ">
            <Logo user='INSTRUCTOR' />
            <div className='text-center mt-16 md:w-1/3 mx-auto px-1' >
                <span className='md:text-sm text-xs text-green-600 font-normal  '>Thank you for signing up! A verification email has been sent to your email address. Please enter the OTP (One-Time Password) here to verify your account </span>
            </div>
            <div className='md:w-1/3 w-3/4 md:h-80  border-gray-500 border-2 rounded-lg mx-auto mt-8'>
                <p className='text-center mt-5 font-thin ml-2'>You're one step away from unlocking amazing opportunities! </p>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()

                }} >
                    <div className="grid gap-2 w-10/12 mx-auto my-5">
                        <Label htmlFor="password" >Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            value={OTP}
                            onChange={(e) => { setOTP(e.target.value) }}
                        />
                    </div>
                    <Button type="submit" className="w-10/12 mx-7 my-4 ">
                        Verify Email
                    </Button>
                    <p className='text-center my-5 text-sm mx-2'>Didn't receive the verification email? <span className='cursor-pointer underline'> Resend </span></p>
                </form>
            </div>
            <Toaster />
        </div>
    )
}

export default Verify
/*

    < div className = "bg-customBg md:h-[1000px] h-[1500px] " >
            <Logo />
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
                            <p className='text-xs mb-1 text-red-600 '>{signupFormError.nameError} </p>
                            <Input
                                id="name"
                                type="text"
                                required
                                value={signupFormData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid w-11/12 mx-auto">
                            <Label htmlFor="email">Email</Label>
                            <p className='md:ml-8 ml-5 text-xs mb-1 text-red-600'>{signupFormError.emailError} </p>

                            <Input
                                id="email"
                                type="email"
                                required
                                value={signupFormData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid w-11/12 mx-auto">
                            <Label htmlFor="password">Password</Label>
                            <p className='text-xs  mb-1 text-red-600 mr-1'>{signupFormError.passwordError} </p>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={signupFormData.password}
                                onChange={handleChange} />
                        </div>
                        <Button type="submit" className="w-11/12 mx-auto" disabled={loading}>
                            Sign up
                        </Button>
                    </div>
                    <p className='text-center my-5 text-sm '>Already on Learn plus? <Link to={INSTRUCTOR_ROUTE_PATHS.login} className='cursor-pointer underline '> Log in </Link></p>
                </form>
            </div>
            <Toaster />
        </ >
        */