import React from 'react'
import { Link } from 'react-router-dom'
import { INSTRUCTOR_ROUTE_PATHS, LEARNER_ROUTE_PATHS, User } from '../../constants'


type Props = {
    theme?: "WHITE" | "BLACK"
    user: User
}


const Logo: React.FC<Props> = ({ theme, user }) => {
    if (!theme) theme = "WHITE"
    return (
        <div className='md:w-52 w-32 md:pt-7 pt-8 pl-7'>

            <Link to={user === "LEARNER" ? LEARNER_ROUTE_PATHS.root : INSTRUCTOR_ROUTE_PATHS.root}>
                {theme === "WHITE" ?
                    <img src='/logo.png'></img>
                    :
                    <img src='/logo-2.png'></img>
                }
            </Link>
        </div>
    )
}

export default Logo
