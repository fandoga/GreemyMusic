import { Route, Routes, } from "react-router-dom";
import Login from "../pages/login/Login";
import Main from "../pages/main/main";
import PrivateRoute from "./PrivateRoute";
import Playlist from "../pages/playlist/playlist";
import Picks from "../pages/Picks/Picks";
import NotFoundPage from "../pages/404/NotFoundPage";
import NoLocalLoginPage from "../pages/noLocalLogin/NoLocalLoginPage";

const AppRoutes = () => {

    const accessToken = localStorage.getItem('access-token');

    return (
        <Routes>
            <Route path="/"
                element={
                    <PrivateRoute>
                        <Main/>
                    </PrivateRoute>
                }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/locallogin" element={<NoLocalLoginPage />} />
            <Route path="/playlist" element={
                <PrivateRoute>
                    <Playlist />
                </PrivateRoute>
            } />
            <Route path="/picks/:id" element={
                <PrivateRoute>
                    <Picks />
                </PrivateRoute>
            } />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default AppRoutes;