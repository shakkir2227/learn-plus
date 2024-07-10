import React, { useEffect, useState } from 'react'
import Logo from '../../components/shared/Logo'
import { Button } from '../../components/ui/button'
import { Link } from 'react-router-dom'
import useSignupFormData from '../../hooks/useSignupFormData.ts'

const Signup: React.FC = () => {

    const { signupFormData, handleChange } = useSignupFormData()

    


    return (
        <div className="bg-customBg md:h-[1000px] h-[1300px] " >
            <Logo />
            <div className='text-center mt-16'>
                <span className='md:text-4xl font-serif text-2xl'> Learn something new <br /> with <span className='font-bold'>Learn Plus</span> </span>
            </div>
            <div className='md:w-1/3 w-3/4 md:h-96  border-gray-500 border-2 rounded-lg mx-auto mt-8'>
                <p className='text-center mt-5 font-thin ml-2'>Get Started: Ignite Your Learning Journey </p>
                <form className=' flex flex-col h-full' >
                    <label htmlFor='name' className='md:ml-8 ml-5  mt-3' >Name </label>
                    <input className='bg-inputColor  border-gray-400 border-2 rounded-md w-5/6 mx-auto h-9 px-2'
                        type='text'
                        id='name'
                        value={signupFormData.name}
                        onChange={handleChange}
                    />
                    <label htmlFor='email' className='md:ml-8 ml-5 mt-3' >Email </label>
                    <input className='bg-inputColor  border-gray-400 border-2 rounded-md w-5/6 mx-auto h-9 px-2'
                        type='email'
                        id='email'
                        value={signupFormData.email}
                        onChange={handleChange}
                    />
                    <label htmlFor='password' className='md:ml-8 ml-5 mt-3'>Password </label>
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
        </div>
    )
}

export default Signup
