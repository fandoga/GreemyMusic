import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";


const Nav = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuStatus] = useState(true);
    const [displayMenu, setDisplayStatus] = useState(true);

    const toggleMenu = () => {
        if (menuOpen) {
            setMenuStatus((prev => !prev));
            setTimeout(() => {
                setDisplayStatus((prev => !prev))
            }, 250);
        } else {
            setDisplayStatus((prev => !prev))
            setTimeout(() => setMenuStatus(true), 10);
        }
    }

    return (
        <nav className="main__nav nav">
            <div className="nav__top">
                <div className="nav__logo logo">
                    <Link to={'/'}>
                        <img className="logo__image" src="/img/logo.png" alt="logo" />
                    </Link>
                </div>
                <div onClick={toggleMenu} className="nav__burger burger">
                    <span className="burger__line"></span>
                    <span className="burger__line"></span>
                    <span className="burger__line"></span>
                </div>
                <div className="nav__menu menu"
                    style={{ opacity: menuOpen ? "1" : "0", display: displayMenu ? "block" : "none" }}>
                    <ul className="menu__list">
                        <li className="menu__item">
                            <Link to="/" className="menu__link">Главная</Link>
                        </li>
                    </ul>
                    <ul className="playlist__list">
                        <li className="playlist-list__item">
                            {/* <Link to="/playlist" className="menu__link">Мой плейлист</Link> */}
                            <button onClick={() => navigate('/playlist')} className="menu__link">Мой плейлист</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="nav__footer">
                <div className="nav__sing-out">
                    <Link to="/login" className="menu__link">Выйти</Link>
                </div>
            </div>
        </nav>
    );
}

export default Nav;