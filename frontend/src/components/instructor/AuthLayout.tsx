import React, { useEffect } from 'react'
import { useAppSelector } from '../../store'
import { Outlet, useNavigate } from 'react-router'
import { INSTRUCTOR_ROUTE_PATHS } from '../../constants'

type Props = {
    forLoggedInUsers: boolean,
}

const AuthLayout: React.FC<Props> = ({ forLoggedInUsers }) => {

    const navigate = useNavigate()
    const isLoggedIn = useAppSelector((state) => (state.instructor.auth.isLoggedIn))

    useEffect(() => {
        if (isLoggedIn && !forLoggedInUsers) {
            navigate(INSTRUCTOR_ROUTE_PATHS.root)
        } else if (!isLoggedIn && forLoggedInUsers) {
            navigate(INSTRUCTOR_ROUTE_PATHS.login)
        }
    })

    return <Outlet />
}

export default AuthLayout
