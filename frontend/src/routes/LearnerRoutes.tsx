import { Route, Routes } from "react-router-dom"
import Signup from "../pages/learner/Signup"
import Login from "../pages/learner/Login"

const LearnerRoutes: React.FC = () => {

    return (
        <Routes>
            <Route path="/signup" element={<Signup />} ></Route>
            <Route path="/login" element={<Login />} ></Route>
        </Routes>
    )

}

export default LearnerRoutes
