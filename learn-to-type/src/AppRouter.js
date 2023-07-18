import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./components/Home";
import Play from "./components/Play";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/play" element={<Play/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter