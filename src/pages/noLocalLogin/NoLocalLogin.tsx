import React from "react";
import '../404/notfound.css'
import { Navigate, useNavigate } from "react-router-dom";

const NoLocalLogin = () => {
    const navigate = useNavigate()
    const clientId = '5de0e892cfa54797a83e15261b1dadae'
    const redirectUri = 'https://fandymusic.vercel.app/login'

    return (
        <div className="main__notfound">
            <h1 className="notfound__title">Упс</h1>
            <h2 className="notfound__subtitle">К сожалению локальная регистрация пока не доступна😭<br>Пожалуйста используйте аккаунт Spotify</br></h2>
            <p className="notfound__text">Она обязательно появиться в будущем, разработчик пока не успел:/
            </p>
            <button onClick={() => navigate('/login')} className="notfound__button">Войти со Spotify</button>
        </div>
    );
};

export default NoLocalLogin;