import React, { useState } from 'react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'
import Logo from '../shared/Logo'
import { AiOutlineMenu } from "react-icons/ai";
import { LEARNER_ROUTE_PATHS } from '../../constants';
import { Button } from '../ui/button';
import { useAppSelector } from '../../store';
import { PiChatCircleDots } from 'react-icons/pi';
import { FaRegUserCircle } from 'react-icons/fa';

const ToggleNav = () => {
    const [showNavBar, setShowNavBar] = useState<boolean>(false)
    const isLoggedIn = useAppSelector((state) => (state.learner.auth.isLoggedIn))

    return (
        <div >
            <div className='flex justify-between '>
                <Logo />
                <AiOutlineMenu onClick={() => setShowNavBar(!showNavBar)} className='mt-8 mr-4 cursor-pointer ' />
            </div>
            {showNavBar &&
                <div className="absolute z-50">
                    <div className=' ml-44 w-32 bg-black text-white p-5 rounded-md'>
                        <NavBar />
                        {isLoggedIn ?
                            <div className='flex p-2 gap-7 items-center mt-5 mr-5'>
                                <Link to={LEARNER_ROUTE_PATHS.root}>
                                    <PiChatCircleDots size={25} />
                                </Link>
                                <Link to={LEARNER_ROUTE_PATHS.root}>
                                    <FaRegUserCircle size={25} />
                                </Link>
                            </div> :
                            <div className='mt-5 md:mr-5' >
                                <Link to={LEARNER_ROUTE_PATHS.login}>
                                    <Button variant={'secondary'}> Login </Button>
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default ToggleNav
