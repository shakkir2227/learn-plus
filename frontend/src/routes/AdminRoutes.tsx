import { Route, Routes } from "react-router-dom"
import Login from "../pages/admin/Login"
import { ROUTE_PATHS } from "../constants"
import { useAppDispatch, useAppSelector } from "../store"
import { useEffect, useState } from "react"
import { getLoggedInUserService } from "../services/admin/AuthService"
import { login } from "../store/AdminSlice"
import AuthLayout from "../components/admin/AuthLayout"
import Home from "../pages/admin/Home"
import Account from "../pages/instructor/Account"


const AdminRoutes: React.FC = () => {
    const dispatch = useAppDispatch()
    const loggedIn = useAppSelector((state) => (state.admin.auth.isLoggedIn))
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
            <Route element={<AuthLayout forLoggedInUsers={false} />}>
                <Route path={ROUTE_PATHS.login} element={<Login />} ></Route>
            </Route>
            <Route element={<AuthLayout forLoggedInUsers={true} />}>
                <Route path={ROUTE_PATHS.root} element={<Home />}> </Route>
            </Route>
        </Routes >

    )

}

export default AdminRoutes
