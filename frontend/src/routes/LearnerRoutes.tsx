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

const LearnerRoutes: React.FC = () => {
    const dispatch = useAppDispatch()

    const loggedIn = useAppSelector((state) => (state.learner.auth.isLoggedIn))
    if (!loggedIn) {
        (async function () {
            const response = await getLoggedInUserService()
            if (response.success) {
                dispatch(login(response.data))
            }
        }())
    }

    return (
        <Routes>
            <Route path={ROUTE_PATHS.root} element={<Home />}> </Route>
            <Route element={<AuthLayout forLoggedInUsers={false} />}>
                <Route path={ROUTE_PATHS.signup} element={<Signup />} ></Route>
                <Route path={ROUTE_PATHS.verify} element={<Verify />} ></Route>
                <Route path={ROUTE_PATHS.login} element={<Login />} ></Route>
            </Route>
        </Routes>
    )

}

export default LearnerRoutes
