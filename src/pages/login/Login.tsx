import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css'
import './login.css'


const Login = () => {

    const navigate = useNavigate();
    const clientId = '5de0e892cfa54797a83e15261b1dadae'
    const [isSingup, setSignup] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [error, setError] = useState('')

    const handleSignup = () => {
        if (repeatPassword === password) {
            if (password !== '' && email !== '') {
                localStorage.setItem('email', email)
                localStorage.setItem('password', password)
                setSignup(false)
                setError('')
                setEmail('')
                setPassword('')
                setRepeatPassword('')
            } else {
                setError('Заполните все поля')
            }
        } else {
            setError('Пароли не совпадают')
        }
    }

    const handleLogin = () => {
        if (password !== '' && email !== '') {
            if (localStorage.getItem('email') === email && localStorage.getItem('password') === password) {
                navigate('/');
            } else {
                setError('Аккаунт не найден')
            }
        } else {
            setError('Заполните все поля')
        }
    }

    const handleSpotify = () => {
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000/login&scope=user-read-private%20user-read-email`
    }


    return (
        <div className="login__container">
            <div className="login">
                <div className="login__logo logo">
                    <img src="img/logo_modal.png" alt="" />
                </div>
                <div className="login__inputs">
                    <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Почта' className="login__input" type='mail' />
                    <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Пароль' className="login__input" type="password" />
                    {isSingup && (
                        <input onChange={(e) => setRepeatPassword(e.target.value)} value={repeatPassword} placeholder='Повторите пароль' className="login__input" type="password" />
                    )}
                    {error !== '' && (
                        <span className='error__text'>{error}</span>
                    )}
                </div>
                <div className="login__buttons">
                    {!isSingup && (
                        <button onClick={() => handleLogin()} className="login__button">Войти</button>
                    )}
                    <button onClick={() => {
                        if (!isSingup) {
                            setSignup(true)
                            setError('')
                            setEmail('')
                            setPassword('')
                            setRepeatPassword('')
                        } else {
                            handleSignup();
                        }
                    }}
                        className="login__button signin__button">Зарегистрироваться</button>
                </div>
            </div>
            <div className="links__block">
                <button onClick={() => handleSpotify()} className='spotify-link__button'>
                    <span>Войти с Spotify</span>
                    <div className="spotify__icon">
                        <img src="/img/icon/spotify.svg" alt="" />
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Login;