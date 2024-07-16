import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { INSTRUCTOR_ROUTE_PATHS, LEARNER_ROUTE_PATHS, User } from '../../constants'

type Props = {
    user: User
}

const LoginButton: React.FC<Props> = ({ user }) => {
    return (
        <div className='mt-5 md:mr-5' >
            <Link to={user === "LEARNER" ? LEARNER_ROUTE_PATHS.login : INSTRUCTOR_ROUTE_PATHS.login}>
                <Button variant={'secondary'}> Login </Button>
            </Link>
        </div>
    )
}

export default LoginButton
