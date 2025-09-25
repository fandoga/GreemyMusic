import { Route, Routes, } from "react-router-dom";
import Login from "../pages/login/Login";
import Main from "../pages/main/main";
import PrivateRoute from "./PrivateRoute";
import NotFoundPage from "../pages/404/NotFoundPage";
import NoLocalLoginPage from "../pages/noLocalLogin/NoLocalLoginPage";

const AppRoutes = () => {
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
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default AppRoutes;