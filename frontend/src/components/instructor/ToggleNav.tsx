import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../shared/Logo'
import { AiOutlineMenu } from "react-icons/ai";
import { INSTRUCTOR_ROUTE_PATHS, LEARNER_ROUTE_PATHS } from '../../constants';
import { Button } from '../ui/button';
import { useAppSelector } from '../../store';
import { PiChatCircleDots } from 'react-icons/pi';
import { FaRegUserCircle } from 'react-icons/fa';

type Props = {
    logoTheme: "WHITE" | "BLACK",
    iconColor: "white" | "black"
}

const ToggleNav: React.FC<Props> = ({ logoTheme, iconColor }) => {
    const [showNavBar, setShowNavBar] = useState<boolean>(false)
    const isLoggedIn = useAppSelector((state) => (state.instructor.auth.isLoggedIn))
    const variant = logoTheme === "WHITE" ? "default" : "secondary"


    return (
        <div >
            <div className='flex justify-between '>
                <Logo theme={logoTheme} user='INSTRUCTOR' />
                <AiOutlineMenu color={logoTheme} onClick={() => setShowNavBar(!showNavBar)} className='mt-8 mr-4 cursor-pointer ' />
            </div>
            {showNavBar &&
                <div className="absolute z-50">
                    <div className={`ml-44 w-32 bg-${logoTheme} ${logoTheme === "WHITE"? "text-black": "text-white"} p-5 rounded-md`}>

                        {isLoggedIn ?
                            <>
                                <Link to={INSTRUCTOR_ROUTE_PATHS.root}>
                                    <Button size="sm" variant={variant}>Dashboard</Button>
                                </Link>

                                <div className='flex p-2 gap-7 items-center mt-5 mr-5'>
                                    <Link to={INSTRUCTOR_ROUTE_PATHS.root}>
                                        <PiChatCircleDots size={25} />
                                    </Link>
                                    <Link to={INSTRUCTOR_ROUTE_PATHS.root}>
                                        <FaRegUserCircle size={25} />
                                    </Link>

                                </div></> :
                            <div className='mt-5 md:mr-5' >
                                <Link to={INSTRUCTOR_ROUTE_PATHS.login}>
                                    <Button variant={variant}> Login </Button>
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
