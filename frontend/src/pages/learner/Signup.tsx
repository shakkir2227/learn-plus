import React from 'react'
import Logo from '../../components/shared/Logo'

const Signup: React.FC = () => {
    return (
        <div className="bg-customBg h-[1000px]" >
            <Logo />
            <div className='text-center mt-16  '>
                <span className='text-4xl font-serif'> Learn something new <br /> with <span className='font-bold'>Learn Plus</span> </span>
            </div>
            <div className='w-1/3 h-80 border-gray-500 border-2 rounded-lg mx-auto mt-8'>
                <p>Get Started: Ignite Your Learning Journey </p>
                <form className=' flex flex-col  h-full'>
                    <label htmlFor='name' className='ml-8  mt-3' >Name </label>
                    <input className='bg-inputColor  border-gray-400 border-2 rounded-md w-5/6 mx-auto h-9'
                        type='text'
                        id='name'
                    />
                    <label htmlFor='email' className='ml-8 mt-3' >Email </label>
                    <input className='bg-inputColor  border-gray-400 border-2 rounded-md w-5/6 mx-auto h-9'
                        type='Email'
                        id='email'
                    />
                    <label htmlFor='password' className='ml-8 mt-3'>Password </label>
                    <input className='bg-inputColor  border-gray-400 border-2 rounded-md w-5/6 mx-auto h-9'
                        type='text'
                        id='password'
                    />
                    
                    <button className=''>Sign Up</button>
                    <p>Already on Learn plus? Log in</p>

                </form>
            </div>


        </div>
    )
}

export default Signup
