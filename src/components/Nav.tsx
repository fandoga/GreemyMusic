import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import Playlist from "../pages/playlist/playlist";


const Nav = () => {

    const navigate = useNavigate();
    const [menuOpen, setMenuStatus] = useState(true);
    const [displayMenu, setDisplayStatus] = useState(true);
    const [loading, setLoading] = useState(false)
    const [playlists, setPlaylists] = useState<any[]>([]);
    let adaptedPlaylists: any[]

    const loadPlaylists = async () => {
        const accessToken = localStorage.getItem('access-token');
        setLoading(true);
        const res = await fetch(
            `https://api.spotify.com/v1/me/playlists`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const data = await res.json();
        setLoading(false);
        setPlaylists(data.items)
    };

    useEffect(() => {
        loadPlaylists();
    }, [])

    adaptedPlaylists = playlists.map(item => {
        const playlist = item;
        const imgUrl = playlist.images[2] ? playlist.images[2].url || "" : playlist.images[0].url || ""
        return {
            Img: imgUrl,
            Name: playlist.name || "",
            Id: playlist.id || "",
            TracksUrl: playlist.tracks.href || ""
        };
    });


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
                        {loading ? loading :
                            adaptedPlaylists.map((playlist, idx) => (
                                <li key={idx} className="playlist-list__item">
                                    <button onClick={() => navigate('/playlist')} className="menu__link">
                                        <div className="playlist__img">
                                            <img src={playlist.Img} alt="" />
                                        </div>
                                        {
                                            playlist.Name && playlist.Name.length > 22
                                                ? playlist.Name.slice(0, 22) + "..."
                                                : playlist.Name || ""
                                        }
                                    </button>
                                </li>
                            ))}
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