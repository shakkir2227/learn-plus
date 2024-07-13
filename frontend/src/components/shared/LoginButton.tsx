import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { LEARNER_ROUTE_PATHS } from '../../constants'

const LoginButton = () => {
    return (
        <div className='mt-5 md:mr-5' >
            <Link to={LEARNER_ROUTE_PATHS.login}>
                <Button variant={'ghost'}> Login </Button>
            </Link>
        </div>
    )
}

export default LoginButton
