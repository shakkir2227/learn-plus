import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LearnerRoutes from "./LearnerRoutes.jsx";
import { ROUTE_PATHS } from "../constants.js";


const RoutePaths: React.FC = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTE_PATHS.learner} element={<LearnerRoutes />} ></Route>
                <Route path={ ROUTE_PATHS.instructor} element={<> Instructor routes</>} ></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutePaths



