import React from 'react'
import Logo from '../shared/Logo'
import NavBar from './NavBar'
import LoginButton from '../shared/LoginButton'
import ToggleNav from './ToggleNav'
import { useAppSelector } from '../../store'
import { FaRegUserCircle } from "react-icons/fa";
import { PiChatCircleDots } from "react-icons/pi";
import { Link } from 'react-router-dom'
import { LEARNER_ROUTE_PATHS } from '../../constants'

const Header = () => {
    const isLoggedIn = useAppSelector((state) => (state.instructor.auth.isLoggedIn))
    return (
        <div>
            <div className="md:flex justify-between  hidden">
                <Logo />
                {isLoggedIn ?
                    <div className='flex p-2 gap-7 items-center mt-5 mr-5'>
                        <Link to={LEARNER_ROUTE_PATHS.root}>
                            <PiChatCircleDots size={35} />
                        </Link>
                        <Link to={LEARNER_ROUTE_PATHS.root}>
                            <FaRegUserCircle size={35} />
                        </Link>
                    </div>
                    :
                    <LoginButton />
                }
            </div>
            <div className="md:hidden block ">
                <ToggleNav />
            </div>
        </div>
    )
}

export default Header
