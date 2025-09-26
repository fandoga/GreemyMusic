import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { usePlaylist } from "../context/PlaylistContext";
import NavSkeleton from "./NavSkeleton";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchPlaylists } from "../store/reducers/playlists/playlistThunk";
import { playlistSlice } from "../store/reducers/playlists/playlistSlice";



const Nav = () => {
    const dispatch = useAppDispatch()
    const { AllPlaylists, isLoading } = useAppSelector(state => state.playlistReducer)
    const { startLoading, setCurrentPlaylist } = playlistSlice.actions
    const { setPlaylistId } = usePlaylist()
    const { setPlaylistTitle } = usePlaylist();
    const [menuOpen, setMenuStatus] = useState(true);
    const [displayMenu, setDisplayStatus] = useState(true);
    const [playlists, setPlaylists] = useState<any[]>([]);
    let adaptedPlaylists: any[] = []


    useEffect(() => {
        if(playlists.length === 0) {
            dispatch(startLoading())
            dispatch(fetchPlaylists({offset: 0, limit: 25}))
        }
        setPlaylists(AllPlaylists || [])
    }, [AllPlaylists])

    adaptedPlaylists = (playlists || [])
        .filter(Boolean)
        .map((item: any) => {
        const playlist = item || {};
        const images = Array.isArray(playlist.images) ? playlist.images : [];
        const imgUrl = images?.[2]?.url || images?.[0]?.url || "";
        return {
            Img: imgUrl,
            Name: playlist.name || "",
            Id: playlist.id || "",
            TracksUrl: playlist.tracks?.href || ""
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
                            <span style={{cursor: "pointer"}} onClick={() => {
                                dispatch(setCurrentPlaylist({}))
                            }} 
                            className="menu__link">Главная</span>
                        </li>
                    </ul>
                    <ul className="playlist__list">
                        {isLoading ? <NavSkeleton /> :
                            adaptedPlaylists.map((playlist, idx) => (
                                <li key={idx} className="playlist-list__item">
                                    <button onClick={() => {
                                        localStorage.removeItem('last-playlist')
                                        dispatch(setCurrentPlaylist(playlist))
                                        setPlaylistId(playlist.Id)
                                        setPlaylistTitle(playlist.Name)
                                    }} className="playlist__button">
                                        <div className="playlist__img">
                                            <img src={playlist.Img} alt="" />
                                        </div>
                                        {
                                            playlist.Name && playlist.Name.length > 19
                                                ? playlist.Name.slice(0, 19) + "..."
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