import { useEffect, useState } from "react";
import SidebarSkeleton from "./SidebarSkeleton";
import UserSkeleton from "./UserSkeleton";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchPicks } from "../store/reducers/picks/picksThunks";
import { playlistSlice } from "../store/reducers/playlists/playlistSlice";
import { fetchUser } from "../store/reducers/user/userThunk";

const Sidebar = () => {
    const dispatch = useAppDispatch()
    const { startLoading, setCurrentPlaylist } = playlistSlice.actions
    const { PicksPlaylists, isLoading } = useAppSelector(state => state.playlistReducer)
    const { userName } = useAppSelector(state => state.userReducer)

    const [playlists, setPlaylists] = useState<{ id: string; image: string }[]>([]);
    const [user, SetUser] = useState<string>("");

    useEffect(() => {
        dispatch(startLoading())
        dispatch(fetchPicks({offset: 0, limit: 25}));
        dispatch(fetchUser())
    }, [dispatch, startLoading])

    useEffect(() => {
        setPlaylists(PicksPlaylists)
        SetUser(userName)
    }, [PicksPlaylists, userName]);

    if (isLoading) {
        return (
            <SidebarSkeleton />
        );
    }

    let adaptedPlaylists
    adaptedPlaylists = (playlists || [])
        .filter(Boolean)
        .map((item: any) => {
        const playlist = item.data || {};
        const images = Array.isArray(playlist.images) ? playlist.images : [];
        const imgUrl = images?.[2]?.url || images?.[0]?.url || "";
        const bigImg = images?.[0]?.url
        return {
            Img: imgUrl,
            BigImg: bigImg, 
            Name: playlist.name || "",
            Id: playlist.id || "",
            TracksUrl: playlist.tracks?.href || ""
        };
    });

    return (
        <div className="main__sidebar sidebar">
            {isLoading
                ? <UserSkeleton />
                : (
                    <div className="sidebar__personal">
                        <p className="sidebar__personal-name">{user}</p>
                        <div className="sidebar__icon">
                            <Link to={"/login"}>
                                <svg>
                                    <use xlinkHref="/img/icon/sprite.svg#logout"></use>
                                </svg>
                            </Link>
                        </div>
                    </div>
                )
            }
            <div className="sidebar__block">
                <div className="sidebar__list">
                    {adaptedPlaylists.map((pl) => (
                        <div className="sidebar__item" key={pl.Id}>
                            <span style={{cursor: "pointer"}} className="sidebar__link"
                             onClick={() => {dispatch(setCurrentPlaylist(pl))}}>
                                <div
                                    className="sidebar__img"
                                    style={{ backgroundImage: `url(${pl.BigImg})` }}
                                />
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;