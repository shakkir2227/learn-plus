import { Route, Routes } from "react-router-dom"
import Signup from "../pages/learner/Signup"
import Verify from "../pages/learner/Verify"
import Login from "../pages/learner/Login"
import { ROUTE_PATHS } from "../constants"
import { useAppDispatch, useAppSelector } from "../store"
import AuthLayout from "../components/learner/AuthLayout"
import Home from "../pages/learner/Home"
import { getLoggedInUserService } from "../services/learner/AuthService"
import { login } from "../store/LearnerSlice"
import { useEffect, useState } from "react"
import CourseDetails from "../pages/learner/CourseDetails"
import CoursesList from "../pages/learner/CoursesList"
import Profile from "../pages/learner/Account"
import Account from "../pages/learner/Account"

const LearnerRoutes: React.FC = () => {
    const dispatch = useAppDispatch()
    const loggedIn = useAppSelector((state) => (state.learner.auth.isLoggedIn))
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!loggedIn) {
            (async function () {
                const response = await getLoggedInUserService()
                setLoading(false)
                if (response.success) {
                    dispatch(login(response.data))
                }
            }())
        }
    }, [loggedIn])

    return loading ? <>Loading...</> : (
        <Routes>
            <Route path={ROUTE_PATHS.root} element={<Home />}> </Route>
            <Route element={<AuthLayout forLoggedInUsers={false} />}>
                <Route path={ROUTE_PATHS.signup} element={<Signup />} ></Route>
                <Route path={ROUTE_PATHS.verify} element={<Verify />} ></Route>
                <Route path={ROUTE_PATHS.login} element={<Login />} ></Route>
            </Route>
            <Route element={<AuthLayout forLoggedInUsers={true} />}>
                <Route path={ROUTE_PATHS.courses} element={<CoursesList />} ></Route>
                <Route path={ROUTE_PATHS.courseDetails} element={<CourseDetails />} ></Route>       
                <Route path={ROUTE_PATHS.account} element={<Account />} ></Route>       
            </Route>
        </Routes>
    )

}

export default LearnerRoutes
