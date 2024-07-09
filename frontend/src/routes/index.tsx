import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LearnerRoutes from "./LearnerRoutes.jsx";


const RoutePaths: React.FC = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<LearnerRoutes />} ></Route>
                <Route path="/instructor" element={<> Instructor routes</>} ></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutePaths



