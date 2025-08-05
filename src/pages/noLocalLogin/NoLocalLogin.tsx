import React from "react";
import './notfound.css'

const NoLocalLogin = () => {
    const clientId = '5de0e892cfa54797a83e15261b1dadae'
    const redirectUri = 'https://fandymusic.vercel.app/login'

    return (
        <div className="main__notfound">
            <h1 className="notfound__title">Упс</h1>
            <h2 className="notfound__subtitle">К сожалению локальная регистрация пока не доступна😭<br>Пожалуйста используйте аккаунт Spotify</br></h2>
            <p className="notfound__text">Она обязательно появиться в будущем, разработчик пока не успел:/
            </p>
            <button onClick={() => window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=user-read-private%20user-read-email%20user-library-read%20user-library-modify%20user-read-recently-played%20playlist-read-private%20playlist-read-collaborative%20playlist-modify-private%20playlist-modify-public%20user-top-read%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing&show_dialog=true`} className="notfound__button">Вернуться на главную</button>
        </div>
    );
};

export default NoLocalLogin;