import { Route, Routes, } from "react-router-dom";
import React from "react";
import Login from "./pages/login/Login";
import Main from "./pages/main/main";
import PrivateRoute from "./components/PrivateRoute";
import Playlist from "./pages/playlist/playlist";
import Picks from "./pages/Picks/Picks";
import NotFoundPage from "./pages/404/NotFoundPage";
import NeedVpn from "./components/NeedVpn";
import { useState } from "react";

const AppRoutes = () => {

    const [vpn, setVpn] = useState(false);

    fetch('https://ipinfo.io/json?token=663adf1cf972e9')
        .then(res => res.json())
        .then(data => {
            const country = data.country;
            country === "RU" ? setVpn(false) : setVpn(true);
        });

    return (
        <Routes>
            <Route path="/"
                element={
                    <PrivateRoute>
                        {vpn ? <Main /> : <NeedVpn />}
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