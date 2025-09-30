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
    // const { setPicksPlaylists } = usePlaylist()

    const [playlists, setPlaylists] = useState<{ id: string; image: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [user, SetUser] = useState<string>("");

    useEffect(() => {
        dispatch(startLoading())
        dispatch(fetchPicks({offset: 0, limit: 25}));
        dispatch(fetchUser())
    }, [dispatch, startLoading])

    useEffect(() => {
        console.log(PicksPlaylists);
        setPlaylists(PicksPlaylists)
        SetUser(userName)
    }, [PicksPlaylists, userName]);

    if (loading) {
        return (
            <SidebarSkeleton />
        );
    }

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
                    {playlists.map((pl, index) => (
                        <div className="sidebar__item" key={pl.id}>
                            <span className="sidebar__link" onClick={() => {dispatch(setCurrentPlaylist(pl))}}>
                                <div
                                    className="sidebar__img"
                                    style={{ backgroundImage: `url(${pl.image})` }}
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