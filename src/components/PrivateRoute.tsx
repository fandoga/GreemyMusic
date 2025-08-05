import React, { ReactElement, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import NeedVpnPage from '../pages/IpCheck/NeedVpnPage';

const isAuthenticated = () => {
    return !!localStorage.getItem('access-token');
};

const PrivateRoute = ({ children }: { children: ReactElement }) => {
    const [vpn, setVpn] = useState<boolean | null>(null); // null = проверка ещё идёт

    useEffect(() => {
        const checkVpn = async () => {
            try {
                const res = await fetch('https://ipinfo.io/json?token=663adf1cf972e9');
                const data = await res.json();
                const country = data.country;
                setVpn(country !== "RU");
            } catch (e) {
                // В случае ошибки считаем, что VPN неактивен (или выводим другую страницу)
                setVpn(false);
            }
        };

        checkVpn();
    }, []);

    if (vpn === null) {
        // Пока проверка идёт — можно вернуть null или прелоадер
        return <div>Проверка VPN...</div>;
    }

    // После проверки
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return vpn ? children : <NeedVpnPage />;
};

export default PrivateRoute;