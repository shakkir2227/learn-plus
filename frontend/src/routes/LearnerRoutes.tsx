import { Route, Routes } from "react-router-dom"
import Signup from "../pages/learner/Signup"
import Login from "../pages/learner/Login"
import { ROUTE_PATHS } from "../constants"

const LearnerRoutes: React.FC = () => {

    return (
        <Routes>
            <Route path={ROUTE_PATHS.signup} element={<Signup />} ></Route>
            <Route path={ROUTE_PATHS.login} element={<Login />} ></Route>
        </Routes>
    )

}

export default LearnerRoutes
