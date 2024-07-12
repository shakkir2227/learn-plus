import { Route, Routes } from "react-router-dom"
import Home from "../pages/instructor/Home"
import Signup from "../pages/instructor/Signup"
import Verify from "../pages/instructor/Verify"
import Login from "../pages/instructor/Login"
import { ROUTE_PATHS } from "../constants"
import { useAppDispatch, useAppSelector } from "../store"
import AuthLayout from "../components/instructor/AuthLayout"
import { login } from "../store/InstructorSlice"
import { getLoggedInUserService } from "../services/instructor/AuthService"


const InstructorRoutes: React.FC = () => {
    const dispatch = useAppDispatch()

    // change
    // const loggedIn = useAppSelector((state) => (state.instructor.auth.isLoggedIn))
    // if (!loggedIn) {
    //     (async function () {
    //         const response = await getLoggedInUserService()
    //         if (response.success) {
    //             dispatch(login(response.data))
    //         }
    //     }())
    // }

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

export default InstructorRoutes
