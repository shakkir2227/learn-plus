import React from 'react'
import Logo from '../shared/Logo'
import LoginButton from '../shared/LoginButton'
import { useAppSelector } from '../../store'
import { FaRegUserCircle } from "react-icons/fa";
import { PiChatCircleDots } from "react-icons/pi";
import { Link } from 'react-router-dom'
import { INSTRUCTOR_ROUTE_PATHS, LEARNER_ROUTE_PATHS, ROUTE_PATHS } from '../../constants'
import ToggleNav from './ToggleNav'
import { Button } from '../ui/button';
import ToggleNavLight from './ToggleNavLight';

type Props = {
    logoTheme: "WHITE" | "BLACK",
    iconColor: "white" | "black"
}

const DashboardHeader: React.FC<Props> = ({ logoTheme, iconColor }) => {
    const isLoggedIn = useAppSelector((state) => (state.instructor.auth.isLoggedIn))
    return (
        <div>
            <div className="md:flex justify-between  hidden">
                <Logo theme={logoTheme} user='INSTRUCTOR' />
                {isLoggedIn ?
                    <div className='flex p-2 gap-7 items-center mt-5 mr-5'>
                        <Link to={INSTRUCTOR_ROUTE_PATHS.dashboard}>
                            <Button variant={'secondary'}>Dashboard</Button>
                        </Link>
                        <Link to={INSTRUCTOR_ROUTE_PATHS.root}>
                            <PiChatCircleDots color={iconColor} size={35} />
                        </Link>
                        <Link to={INSTRUCTOR_ROUTE_PATHS.root}>
                            <FaRegUserCircle color={iconColor} size={35} />
                        </Link>
                    </div>
                    :
                    <LoginButton user='INSTRUCTOR' />
                }
            </div>
            <div className="md:hidden block ">
                <ToggleNavLight />
            </div>
        </div>
    )
}

export default DashboardHeader
