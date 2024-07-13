import React, { useState } from 'react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'
import Logo from '../shared/Logo'
import { AiOutlineMenu } from "react-icons/ai";
import LoginButton from '../shared/LoginButton';
const ToggleNav = () => {
    const [showNavBar, setShowNavBar] = useState<boolean>(false)

    return (
        <div >
            <div className='flex justify-between '>
                <Logo />
                <AiOutlineMenu onClick={() => setShowNavBar(!showNavBar)} className='mt-8 mr-4 cursor-pointer ' />
            </div>
            { showNavBar &&
                <div className="">
                    <div className='mt-2 md:ml-0 ml-36 w-32 bg-white p-5 rounded-md'>
                        <NavBar />
                        <LoginButton />
                    </div>
                </div>
            }

        </div>
    )
}

export default ToggleNav
