import { Route, Routes } from "react-router-dom"
import Signup from "../pages/learner/Signup"

const LearnerRoutes: React.FC = () => {

    return (
        <Routes>
            <Route path="/signup" element={<Signup />} ></Route>
            <Route path="/login" element={<>Login</>} ></Route>
        </Routes>
    )

}

export default LearnerRoutes
