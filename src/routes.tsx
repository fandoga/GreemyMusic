import { Route, Routes, } from "react-router-dom";
import React from "react";
import Login from "./pages/login/Login";
import Main from "./pages/main/main";
import PrivateRoute from "./components/PrivateRoute";
import Playlist from "./pages/playlist/playlist";
import Picks from "./pages/Picks/Picks";
import NotFoundPage from "./pages/404/NotFoundPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/"
                element={
                    <PrivateRoute>
                        <Main />
                    </PrivateRoute>
                }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/picks/:id" element={<Picks />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default AppRoutes;