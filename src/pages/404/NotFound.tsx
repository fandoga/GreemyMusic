import React from "react";
import { useNavigate } from "react-router-dom";
import './notfound.css'

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="main__notfound">
            <h1 className="notfound__title">404</h1>
            <h2 className="notfound__subtitle">Страница не найдена😭</h2>
            <p className="notfound__text">Возможно, она была удалена
                или перенесена на другой адрес
            </p>
            <button onClick={() => navigate('/')} className="notfound__button">Вернуться на главную</button>
        </div>
    );
};

export default NotFound;