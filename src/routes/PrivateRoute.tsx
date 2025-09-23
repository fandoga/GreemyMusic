import React, { ReactElement, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import NeedVpnPage from '../pages/IpCheck/NeedVpnPage';



const isAuthenticated = () => {
    return !!localStorage.getItem('access-token');
};

const PrivateRoute = ({ children }: { children: ReactElement }) => {
    const [vpn, setVpn] = useState(false);

    useEffect(() => {
        fetch('https://ipinfo.io/json?token=663adf1cf972e9')
            .then(res => res.json())
            .then(data => {
                const country = data.country;
                country === "RU" ? setVpn(false) : setVpn(true);
            });
    }, [])

    return isAuthenticated() ? (vpn ? children : <NeedVpnPage />) : <Navigate to="/login" replace />;
};

export default PrivateRoute;