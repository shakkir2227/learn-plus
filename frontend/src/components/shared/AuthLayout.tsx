import React from 'react'
import { useAppSelector } from '../../store'
import { Outlet, useNavigate } from 'react-router'
import { ROUTE_PATHS } from '../../constants'

type Props = {
    forLoggedInUsers: boolean,
}

const AuthLayout: React.FC<Props> = ({ forLoggedInUsers }) => {

    const navigate = useNavigate()
    const isLoggedIn = useAppSelector((state) => (state.learner.auth.isLoggedIn))

    if (isLoggedIn && forLoggedInUsers) {
        return <Outlet />
    } else if (isLoggedIn && !forLoggedInUsers) {
        navigate(ROUTE_PATHS.learner)
        return
    } else if (!isLoggedIn && forLoggedInUsers) {
        navigate(ROUTE_PATHS.login)
    } else {
        return <Outlet />
    }
}

export default AuthLayout
