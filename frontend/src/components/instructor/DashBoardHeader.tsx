import React from 'react'
import Logo from '../shared/Logo'
import { Link } from 'react-router-dom'
import { PiChatCircleDots } from 'react-icons/pi'
import { INSTRUCTOR_ROUTE_PATHS } from '../../constants'
import { FaRegUserCircle } from 'react-icons/fa'

const DashBoardHeader = () => {
    return (
        <div className='flex justify-between'>
            <Logo theme='WHITE' user='INSTRUCTOR' />
            <div className='flex p-2 gap-7 items-center mt-5 mr-5'>
                <Link to={INSTRUCTOR_ROUTE_PATHS.root}>
                    <PiChatCircleDots size={35} />
                </Link>
                <Link to={INSTRUCTOR_ROUTE_PATHS.root}>
                    <FaRegUserCircle size={35} />
                </Link>
            </div>
        </div>
    )
}

export default DashBoardHeader
